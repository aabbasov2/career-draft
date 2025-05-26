import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Create Winning Resumes Instantly with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tailor your resume and cover letter to any job in seconds.
            </p>
            <Link 
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started Free
            </Link>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-gray-900/20 rounded-2xl">
              {/* Placeholder for hero image - replace src with your actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-64 h-64 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
