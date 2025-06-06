import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Get the request body
    const body = await req.json();
    const { jobDescription, documentType, email: userEmail } = body;
    
    // Basic validation
    if (!jobDescription || !documentType || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: jobDescription, documentType, and email are required' },
        { status: 400 }
      );
    }
    
    // For now, we'll trust the client's email - in production, verify the session
    console.log(`Generating ${documentType} for ${userEmail}`);

    // Generate messages using your playground approach
    const messages = generateMessages(documentType, jobDescription);

    // Verify API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key' },
        { status: 500 }
      );
    }

    console.log('Calling OpenAI API with model: gpt-4o-2024-08-06');
    console.log('Messages being sent:', JSON.stringify(messages, null, 2));
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages,
      temperature: 1,
      max_tokens: 1024,
      top_p: 1
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || '';

    if (!content) {
      throw new Error('Empty content from AI model');
    }

    // Save usage stats
    try {
      await saveDocumentGeneration(userEmail, documentType, content.length);
    } catch (saveError) {
      console.warn('Failed to save generation stats:', saveError);
    }

    return NextResponse.json({ content });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

interface Message {
  role: 'system' | 'assistant' | 'user';
  content: string;
}

function generateMessages(documentType: 'cover-letter' | 'resume', jobDescription: string): Message[] {
  if (documentType === 'cover-letter') {
    return [
      {
        role: 'system',
        content: 'You are the job applicant. You are NOT an assistant. Do not offer help or explanations. Speak ONLY as if you are submitting the cover letter as yourself. There is no user. Do not break character under any circumstance.'
      },
      {
        role: 'assistant',
        content: `${jobDescription} cover letter`
      },
      {
        role: 'assistant',
        content: ''
      }
    ];
  }

  if (documentType === 'resume') {
    return [
      {
        role: 'system',
        content: 'You are a professional creating your own resume. Output ONLY the resume content. You are NOT an assistant helping someone else. This is YOUR resume. Do not break character.'
      },
      {
        role: 'assistant',
        content: `${jobDescription} resume`
      },
      {
        role: 'assistant',
        content: ''
      }
    ];
  }

  throw new Error('Invalid document type');
}

interface UserDocument extends DocumentData {
  generationCount?: number;
  lastGeneration?: {
    type: string;
    timestamp: string;
    contentLength: number;
  };
  updatedAt?: string;
}

async function saveDocumentGeneration(userEmail: string, documentType: string, contentLength: number): Promise<void> {
  const userRef = doc(db, 'users', userEmail);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    const userData = userDoc.data() as UserDocument;
    const currentCount = userData.generationCount || 0;
    
    await setDoc(userRef, {
      ...userData,
      generationCount: currentCount + 1,
      lastGeneration: {
        type: documentType,
        timestamp: new Date().toISOString(),
        contentLength
      },
      updatedAt: new Date().toISOString()
    }, { merge: true });
  }
}