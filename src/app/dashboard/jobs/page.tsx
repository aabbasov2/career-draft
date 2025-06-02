'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import JobInputForm from '@/components/JobInputForm';
import GeneratedContent from '@/components/GeneratedContent';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ArrowLeftIcon,
  UserCircleIcon,
  ChevronRightIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

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

  // Use your route.ts which now uses OpenAI GPT-4
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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate document');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  };

  const handleGenerate = async (jobDescription: string, documentType: DocumentType) => {
    setIsGenerating(true);
    try {
      if (documentType === 'both') {
        const [resume, coverLetter] = await Promise.all([
          generateDocument(jobDescription, 'resume'),
          generateDocument(jobDescription, 'cover-letter')
        ]);
        setGeneratedContent({ resume, 'cover-letter': coverLetter });
      } else {
        const content = await generateDocument(jobDescription, documentType);
        setGeneratedContent(prev => ({
          ...prev,
          [documentType]: content
        }));
      }
      toast.success('Document generated successfully!');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate document');
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
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="glass-card p-8 text-center animate-fadeInUp">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/5 z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-0"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 z-0"></div>

      <main className="relative z-10 max-w-7xl mx-auto pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="glass-card p-8 mb-8 text-center animate-fadeInUp">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white">
                <RocketLaunchIcon className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Generate Tailored Documents
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Create AI-powered resumes and cover letters that perfectly match any job description
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-primary" />
                AI-Powered
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2 text-primary" />
                Professional Format
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" />
                Job-Specific
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 text-center animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white w-fit mx-auto mb-4">
              <DocumentTextIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Builder</h3>
            <p className="text-gray-600 text-sm">Create a professional resume tailored to your target job</p>
          </div>
          <div className="glass-card p-6 text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white w-fit mx-auto mb-4">
              <BriefcaseIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Letter</h3>
            <p className="text-gray-600 text-sm">Generate compelling cover letters that stand out</p>
          </div>
          <div className="glass-card p-6 text-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white w-fit mx-auto mb-4">
              <UserCircleIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Package</h3>
            <p className="text-gray-600 text-sm">Get both resume and cover letter in one go</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Job Input Form */}
          <div className="glass-card p-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white mr-4">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Start Creating</h2>
                <p className="text-gray-600">Paste the job description and choose what to generate</p>
              </div>
            </div>
            <JobInputForm 
              onGenerate={handleGenerate} 
              isLoading={isGenerating}
            />
          </div>

          {/* Generated Content */}
          {(generatedContent.resume || generatedContent['cover-letter']) && (
            <div className="space-y-6">
              <div className="glass-card p-6 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white mr-3">
                    <DocumentTextIcon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Generated Documents</h2>
                </div>
                <p className="text-gray-600 mb-6">Your AI-generated documents are ready! Review and save them to your profile.</p>
              </div>

              {generatedContent.resume && (
                <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                  <GeneratedContent
                    content={generatedContent.resume}
                    type="resume"
                    onSave={(content) => handleSaveDocument(content, 'resume')}
                    isSaving={isSaving}
                  />
                </div>
              )}
              
              {generatedContent['cover-letter'] && (
                <div className="animate-fadeInUp" style={{animationDelay: '0.7s'}}>
                  <GeneratedContent
                    content={generatedContent['cover-letter']}
                    type="cover-letter"
                    onSave={(content) => handleSaveDocument(content, 'cover-letter')}
                    isSaving={isSaving}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}