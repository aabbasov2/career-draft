import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Career Draft AI - Create Winning Resumes Instantly with AI",
  description: "AI-powered resume and cover letter generator for job seekers. Create professional resumes tailored to your industry in seconds.",
  keywords: ["resume builder", "AI resume", "cover letter generator", "job application", "career tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] text-gray-900 font-sans">
        <AuthProvider>
          <Navbar />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10B981',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
