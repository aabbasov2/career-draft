'use client';

import { useState } from 'react';
import { DocumentTextIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import DocumentActions from './DocumentActions';

interface GeneratedContentProps {
  content: string;
  type: 'resume' | 'cover-letter';
  onSave: (content: string) => void;
  isSaving: boolean;
}

export default function GeneratedContent({ content, type, onSave, isSaving }: GeneratedContentProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Removed handleDownload as it's now handled by DocumentActions

  const handleSave = () => {
    onSave(editedContent);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {type === 'resume' ? 'Resume' : 'Cover Letter'}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <DocumentActions 
            content={editedContent} 
            type={type} 
            onEmailSent={() => toast.success('Document sent to your email!')}
            isPaidUser={false} // You'll need to implement user subscription check
          />
        </div>
      </div>
      <div className="px-6 py-4">
        {type === 'resume' ? (
          <ul className="list-disc pl-5 space-y-2">
            {editedContent
              .split('\n')
              .filter((point) => point.trim())
              .map((point, index) => (
                <li key={index} className="text-gray-700">
                  {point.trim().replace(/^[-•*]\s*/, '')}
                </li>
              ))}
          </ul>
        ) : (
          <div className="whitespace-pre-line text-gray-700">{editedContent}</div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? 'Saving...' : 'Save to Profile'}
        </button>
      </div>
    </div>
  );
}
