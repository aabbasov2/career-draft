'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import JobInputForm from '@/components/JobInputForm';
import GeneratedContent from '@/components/GeneratedContent';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

type DocumentType = 'resume' | 'cover-letter' | 'both';

interface GeneratedContentType {
  resume: string | null;
  'cover-letter': string | null;
}

export default function JobsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentType>({ 
    resume: null, 
    'cover-letter': null 
  });
  const [isSaving, setIsSaving] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const generateWithGroq = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`
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

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate content');
      }

      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  };

  const handleGenerate = async (jobDescription: string, documentType: DocumentType) => {
    if (!user) {
      console.error('User not authenticated');
      alert('Please sign in to generate documents');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent({ resume: null, 'cover-letter': null });

    try {
      console.log('Starting document generation for types:', documentType);
      const types = documentType === 'both' ? ['resume', 'cover-letter'] : [documentType];
      
      // Fetch user profile data
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }
      const userData = userDoc.data();
      
      // Format user data for the prompt
      const userProfile = `
### User Profile:
- Name: ${userData.name || 'Not specified'}
- Email: ${userData.email || 'Not specified'}
- Phone: ${userData.phone || 'Not specified'}
- Location: ${userData.location || 'Not specified'}
- LinkedIn: ${userData.linkedInURL || 'Not specified'}
- Portfolio: ${userData.portfolioURL || 'Not specified'}
- Summary: ${userData.summary || 'Not specified'}
- Skills: ${userData.skills?.join(', ') || 'Not specified'}
- Experience: ${userData.experience?.map((exp: any) => 
    `\n  - ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})\n    ${exp.description}`).join('\n') || 'None'}
- Education: ${userData.education?.map((edu: any) => 
    `\n  - ${edu.degree} at ${edu.school} (${edu.graduationYear})`).join('\n') || 'None'}
`;

      for (const type of types) {
        console.log(`Generating ${type}...`);
        const prompt = type === 'resume' 
          ? `You are a resume writing assistant. Generate a professional resume in plain text format. The output should be structured and well-formatted so that it can be converted to a PDF.

### Job Description:
${jobDescription}

${userProfile}

### Output Format:
- Use clear section headers (like **Summary**, **Skills**, **Experience**, **Education**)
- Write bullet points for experience with action verbs and quantified impact
- Tailor the content to match the job description
- Optimize for applicant tracking systems (ATS)
- Keep length under 2 pages
- Output in plain text format with markdown for formatting

Only return the resume content. No explanations.`
          : `Write a professional cover letter for this job. Tailor it to match the job description and highlight relevant skills and experience from the user's profile. Keep it concise and professional.\n\nJob Description:\n${jobDescription}\n\nUser Profile:${userProfile}`;
        
        const content = await generateWithGroq(prompt);
        setGeneratedContent(prev => ({
          ...prev,
          [type]: content
        }));
        
        console.log(`Successfully generated ${type}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      console.error('Generation error:', errorMessage, error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDocument = async (content: string, type: 'resume' | 'cover-letter') => {
    if (!user) return;

    setIsSaving(true);
    try {
      const docRef = doc(collection(db, `users/${user.uid}/documents`));
      await setDoc(docRef, {
        type,
        content,
        jobDescription: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      toast.success('Document saved successfully!');
    } catch (error) {
      console.error('Error saving document:', error);
      toast.error('Failed to save document');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Generate Tailored Documents</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create a customized resume or cover letter based on a job description
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <JobInputForm 
              onGenerate={handleGenerate} 
              isLoading={isGenerating}
            />
          </div>

          {generatedContent.resume && (
            <GeneratedContent
              content={generatedContent.resume}
              type="resume"
              onSave={(content) => handleSaveDocument(content, 'resume')}
              isSaving={isSaving}
            />
          )}
          {generatedContent['cover-letter'] && (
            <GeneratedContent
              content={generatedContent['cover-letter']}
              type="cover-letter"
              onSave={(content) => handleSaveDocument(content, 'cover-letter')}
              isSaving={isSaving}
            />
          )}
        </div>
      </main>
    </div>
  );
}
