'use client';

import React, { useState } from 'react';
import { ArrowDownTrayIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

type DocumentType = 'resume' | 'cover-letter';

interface DocumentActionsProps {
  content: string;
  type: DocumentType;
  onEmailSent?: () => void;
  isPaidUser?: boolean;
}

export default function DocumentActions({ content, type, onEmailSent, isPaidUser = false }: DocumentActionsProps) {
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const cleanAIIntroText = (content: string, type: DocumentType): string => {
    let cleanedContent = content;
    
    // Common AI introduction patterns for both resumes and cover letters
    const commonAIIntros = [
      /^here is a (professional )?resume/i,
      /^here is a (professional )?cover letter/i,
      /^here'?s a (professional )?(resume|cover letter)/i,
      /^i'?ve (created|prepared|generated) a (professional )?(resume|cover letter)/i,
      /^below is a (professional )?(resume|cover letter)/i,
      /^here is your (professional )?(resume|cover letter)/i,
      /^this is a (professional )?(resume|cover letter)/i,
      /^the following is a (professional )?(resume|cover letter)/i,
      /^i'?ve crafted a (professional )?(resume|cover letter)/i,
      /^please find (below )?a (professional )?(resume|cover letter)/i,
      /^attached is a (professional )?(resume|cover letter)/i,
      /^dear hiring manager,?\s*\n\s*here is/i,
      /^based on (your|the) (information|details|requirements),? here is/i,
      /^using the (information|details) provided,? here is/i,
    ];
    
    // Remove any matching intros
    commonAIIntros.forEach(regex => {
      cleanedContent = cleanedContent.replace(regex, '').trim();
    });
    
    // Remove common transitional phrases
    const transitionPhrases = [
      /^(for (your|the) consideration[,:]?\s*)/i,
      /^(tailored to the position[,:]?\s*)/i,
      /^(customized for this role[,:]?\s*)/i,
      /^(formatted for your review[,:]?\s*)/i,
    ];
    
    transitionPhrases.forEach(regex => {
      cleanedContent = cleanedContent.replace(regex, '').trim();
    });
    
    // Remove any remaining empty lines at the start
    cleanedContent = cleanedContent.replace(/^\s*\n+/, '').trim();
    
    return cleanedContent;
  };

  const formatResumeContent = (content: string): string => {
    // Split content into sections and format them properly
    const lines = content.split('\n').filter(line => line.trim() !== '');
    let formattedContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if line is a section header (all caps, contains common resume sections, or ends with colon)
      const isHeader = /^[A-Z\s]{3,}$/.test(line) || 
                      /^(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|OBJECTIVE|PROJECTS|CERTIFICATIONS|ACHIEVEMENTS|CONTACT|PROFESSIONAL SUMMARY|WORK EXPERIENCE|TECHNICAL SKILLS|CORE COMPETENCIES|QUALIFICATIONS)/i.test(line) ||
                      line.endsWith(':');
      
      if (isHeader) {
        formattedContent += `<div class="resume-section-header">${line.replace(':', '')}</div>\n`;
      } else if (line.includes('•') || line.includes('-')) {
        // Bullet points
        formattedContent += `<div class="resume-bullet">${line}</div>\n`;
      } else if (/^\d{4}(-\d{4})?/.test(line) || /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(line)) {
        // Dates
        formattedContent += `<div class="resume-date">${line}</div>\n`;
      } else if (line.length > 0) {
        // Regular content
        formattedContent += `<div class="resume-content">${line}</div>\n`;
      }
    }
    
    return formattedContent;
  };

  const handleDownloadPDF = async () => {
    setIsSending(true);

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a container for the PDF content
      const element = document.createElement('div');
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Clean up AI-generated introductory text
      const cleanedContent = cleanAIIntroText(content, type);
      
      // Format content based on document type
      const formattedContent = type === 'resume' ? 
        formatResumeContent(cleanedContent) : 
        cleanedContent.split('\n').map(paragraph => 
          paragraph.trim() === '' 
            ? '<div style="margin-bottom: 15px;"></div>' 
            : `<p style="margin: 0 0 12px 0; text-align: justify;">${paragraph}</p>`
        ).join('');

      element.innerHTML = `
        <style>
          .resume-section-header {
            font-size: 16px;
            font-weight: bold;
            color: #1a365d;
            margin: 20px 0 10px 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #3182ce;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .resume-bullet {
            margin: 5px 0 5px 20px;
            line-height: 1.6;
          }
          .resume-date {
            font-style: italic;
            color: #4a5568;
            margin: 5px 0;
            font-size: 13px;
          }
          .resume-content {
            margin: 8px 0;
            line-height: 1.7;
          }
          .cover-letter-content p {
            text-align: justify;
            text-justify: inter-word;
          }
        </style>
        <div style="
          font-family: 'Segoe UI', 'Calibri', Arial, sans-serif; 
          color: #2d3748;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 30px 40px;
          background: white;
        ">
          <!-- Header Section -->
          <div style="
            text-align: center; 
            margin-bottom: 35px;
            border-bottom: 3px solid #3182ce;
            padding-bottom: 25px;
          ">
            <h1 style="
              font-size: 32px; 
              font-weight: 700;
              color: #1a365d;
              margin: 0 0 8px 0;
              letter-spacing: -0.5px;
            ">
              ${type === 'resume' ? 'Professional Resume' : 'Cover Letter'}
            </h1>
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 20px;
              color: #4a5568;
              font-size: 14px;
              margin-top: 12px;
              font-weight: 500;
            ">
              <span>${currentDate}</span>
              <span style="color: #3182ce;">•</span>
              <span>Generated by CareerDraft</span>
            </div>
          </div>
          
          <!-- Content Section -->
          <div style="
            font-size: ${type === 'resume' ? '14px' : '15px'};
            color: #2d3748;
            line-height: ${type === 'resume' ? '1.6' : '1.8'};
          " class="${type === 'cover-letter' ? 'cover-letter-content' : ''}">
            ${formattedContent}
          </div>
          
          <!-- Footer -->
          <div style="
            margin-top: 50px;
            padding-top: 25px;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #718096;
            text-align: center;
          ">
            <div style="margin-bottom: 5px;">
              This ${type === 'resume' ? 'resume' : 'cover letter'} was generated using CareerDraft
            </div>
            <div style="font-style: italic;">
              AI-Powered Professional Document Builder
            </div>
          </div>
        </div>
      `;

      // PDF generation options
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `${type}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
      };

      // Generate and download PDF
      const worker = html2pdf()
        .set(opt)
        .from(element);

      // @ts-ignore - save is not properly typed in the library
      await worker.save();
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleEmailDocument = async () => {
    if (!isPaidUser) {
      toast.error('Please upgrade to a paid plan to email documents');
      return;
    }
    
    if (!user?.email) {
      toast.error('No email address found. Please sign in again.');
      return;
    }
    
    setIsSending(true);

    try {
      // First, generate the PDF
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.createElement('div');
      
      // Clean and format content for email
      const cleanedContent = cleanAIIntroText(content, type);
      const formattedContent = type === 'resume' ? 
        formatResumeContent(cleanedContent) : 
        cleanedContent.split('\n').map(paragraph => 
          paragraph.trim() === '' ? '<br>' : `<p>${paragraph}</p>`
        ).join('');

      element.innerHTML = `
        <div style="
          font-family: 'Segoe UI', Arial, sans-serif; 
          padding: 30px;
          background: white;
          color: #2d3748;
        ">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="
              font-size: 28px; 
              font-weight: bold;
              color: #1a365d;
              margin: 0 0 10px 0;
            ">
              ${type === 'resume' ? 'Professional Resume' : 'Cover Letter'}
            </h1>
            <p style="
              color: #4a5568; 
              margin: 0;
              font-size: 14px;
            ">
              Generated by CareerDraft on ${new Date().toLocaleDateString()}
            </p>
          </div>
          <div style="line-height: 1.7;">
            ${formattedContent}
          </div>
        </div>
      `;

      // Generate PDF as blob
      const pdfBlob = await new Promise<Blob>((resolve, reject) => {
        try {
          const worker = html2pdf()
            .set({
              margin: 15,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { 
                scale: 2, 
                useCORS: true,
                logging: false,
                letterRendering: true
              },
              jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
              },
            })
            .from(element);
            
          // @ts-ignore - outputPdf is not in the type definitions but exists in the library
          worker.outputPdf('blob')
            .then(resolve)
            .catch(reject);
        } catch (error) {
          reject(error);
        }
      });

      // Convert blob to base64
      const base64Pdf = await new Promise<string>((resolve, reject) => {
        try {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(pdfBlob);
        } catch (error) {
          reject(error);
        }
      });

      // Send email with PDF attachment
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          subject: `Your ${type === 'resume' ? 'Resume' : 'Cover Letter'} from CareerDraft`,
          text: `Please find your ${type} attached.\n\nThank you for using CareerDraft!`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #1a365d;">Your ${type === 'resume' ? 'Resume' : 'Cover Letter'}</h2>
              <p>Please find your professionally formatted ${type} attached as a PDF.</p>
              <p>Thank you for using CareerDraft!</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 12px; color: #718096;">
                This document was generated using CareerDraft - AI-Powered Resume Builder
              </p>
            </div>
          `,
          attachments: [
            {
              content: base64Pdf.split(',')[1], // Remove the data URL prefix
              filename: `${type}-${new Date().toISOString().split('T')[0]}.pdf`,
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send email');
      }

      const result = await response.json();
      
      if (result.previewUrl) {
        console.log('Email preview:', result.previewUrl);
        toast.success(
          <div>
            <p>{`${type === 'resume' ? 'Resume' : 'Cover letter'} sent to ${user.email}`}</p>
            {process.env.NODE_ENV === 'development' && (
              <a href={result.previewUrl} target="_blank" rel="noopener noreferrer" className="underline">
                View email preview (development only)
              </a>
            )}
          </div>
        );
      } else {
        toast.success(`${type === 'resume' ? 'Resume' : 'Cover letter'} sent to ${user.email}`);
      }
      
      onEmailSent?.();
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast.error(error.message || 'Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <button
        onClick={handleDownloadPDF}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
        disabled={isSending}
      >
        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
        {isSending ? 'Generating...' : 'Download PDF'}
      </button>
      <button
        onClick={handleEmailDocument}
        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
        disabled={isSending || !isPaidUser}
      >
        <EnvelopeIcon className="h-5 w-5 mr-2" />
        {isSending ? 'Sending...' : 'Email Me'}
      </button>
    </div>
  );
}