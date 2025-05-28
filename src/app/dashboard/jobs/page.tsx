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

  // Use your route.ts instead of direct Groq calls
  const generateDocument = async (jobDescription: string, documentType: 'resume' | 'cover-letter'): Promise<string> => {
    try {
      if (!user?.email) {
        throw new Error('User email not found. Please sign in again.');
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          documentType,
          email: user.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  };

  const handleGenerate = async (jobDescription: string, documentType: DocumentType) => {
    if (!user) {
      console.error('User not authenticated');
      toast.error('Please sign in to generate documents');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent({ resume: null, 'cover-letter': null });

    try {
      console.log('Starting document generation for types:', documentType);
      const types = documentType === 'both' ? ['resume', 'cover-letter'] : [documentType];
      
      for (const type of types as ('resume' | 'cover-letter')[]) {
        console.log(`Generating ${type}...`);
        
        const content = await generateDocument(jobDescription, type);
        
        setGeneratedContent(prev => ({
          ...prev,
          [type]: content
        }));
        
        console.log(`Successfully generated ${type}`);
      }
      
      toast.success('Documents generated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      console.error('Generation error:', errorMessage, error);
      toast.error(`Error: ${errorMessage}`);
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