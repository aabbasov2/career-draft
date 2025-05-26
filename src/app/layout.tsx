import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
