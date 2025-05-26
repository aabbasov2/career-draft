import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  console.log('\n--- New API Request ---');
  
  try {
    // Verify session
    console.log('Checking session...');
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.error('❌ Unauthorized: No valid session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log('✅ Session valid for user:', session.user.email);

    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { jobDescription, documentType } = body;
    
    if (!jobDescription || !documentType) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: jobDescription and documentType are required' },
        { status: 400 }
      );
    }
    
    // For now, we'll use a simple prompt since we're not fetching user profile
    // In a production app, you would fetch the user's profile here
    let prompt = '';
    if (documentType === 'resume') {
      prompt = `Create a professional resume for a job with the following description: ${jobDescription}`;
    } else if (documentType === 'cover-letter') {
      prompt = `Write a professional cover letter for a job with the following description: ${jobDescription}`;
    } else {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
    }

    // Call Groq API with DeepSeek model
    console.log('\nPreparing to call Groq API...');
    console.log('Prompt length:', prompt.length, 'characters');
    console.log('Document type:', documentType);
    
    try {
      // Check for API key
      if (!process.env.GROQ_API_KEY) {
        const errorMsg = 'GROQ_API_KEY is not set in environment variables';
        console.error('❌', errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('✅ Groq API Key found');
      console.log('Model: llama-3.3-70b-versatile');
      
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are a professional career coach and resume writer.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Groq API error:', errorData);
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }
      
      const completion = await response.json();
      console.log('Groq API response received');
      const content = completion.choices[0]?.message?.content || '';
      
      if (!content) {
        console.error('Empty content in response');
        console.error('❌ Received empty content from the AI model');
        throw new Error('Received empty content from the AI model');
      }
      
      console.log('✅ Successfully received response from Groq API');
      console.log('Response length:', content.length, 'characters');
    
      // In a production app, you would save the document to Firestore here
      // For now, we'll just log that we would save it
      console.log('Would save document to Firestore:', {
        type: documentType,
        contentLength: content.length,
        jobDescriptionLength: jobDescription.length
      });

      return NextResponse.json({ content });
    } catch (apiError) {
      console.error('Error calling Groq API:', apiError);
      return NextResponse.json(
        { error: 'Failed to generate content: ' + (apiError instanceof Error ? apiError.message : 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function generateResumePrompt(jobDescription: string, userProfile: any): string {
  return `Rewrite the user's experience to match this job:

Job Description: ${jobDescription}

User Profile: 
Name: ${userProfile.fullName || 'Not specified'}
Title: ${userProfile.jobTitle || 'Not specified'}
Skills: ${userProfile.skills?.join(', ') || 'None listed'}
Work Experience: ${userProfile.workExperience || 'None provided'}

Return 4-6 short resume bullet points (max 12 words each) tailored to the job. Focus on quantifiable achievements and relevant skills.`;
}

function generateCoverLetterPrompt(jobDescription: string, userProfile: any): string {
  return `Write a 3-paragraph professional cover letter tailored to this job:

Job Description: ${jobDescription}

User Info: 
Name: ${userProfile.fullName || 'Not specified'}
Role: ${userProfile.jobTitle || 'Not specified'}
Skills: ${userProfile.skills?.join(', ') || 'None listed'}
Work Experience: ${userProfile.workExperience || 'None provided'}

Write in a professional tone, highlight relevant experience, and express enthusiasm for the role.`;
}
