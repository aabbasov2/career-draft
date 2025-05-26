'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type DocumentType = 'resume' | 'cover-letter' | 'both';

interface JobInputFormProps {
  onGenerate: (jobDescription: string, documentType: DocumentType) => void;
  isLoading: boolean;
}

export default function JobInputForm({ onGenerate, isLoading }: JobInputFormProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('both');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    onGenerate(jobDescription, documentType);
  };

  if (!user) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate Tailored Documents</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Generate
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={documentType === 'resume'}
                onChange={() => setDocumentType('resume')}
              />
              <span className="ml-2 text-sm text-gray-700">Resume</span>
            </label>
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={documentType === 'cover-letter'}
                onChange={() => setDocumentType('cover-letter')}
              />
              <span className="ml-2 text-sm text-gray-700">Cover Letter</span>
            </label>
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={documentType === 'both'}
                onChange={() => setDocumentType('both')}
              />
              <span className="ml-2 text-sm text-gray-700">Both</span>
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !jobDescription.trim()}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading || !jobDescription.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Documents'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
