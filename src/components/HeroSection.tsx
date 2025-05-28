import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#43B581]/10 via-white to-[#6366F1]/10 -z-10" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#6366F1]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#43B581]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#FFB703]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Get Drafted by Your <span className="text-[#43B581]">Dream Job</span> — Instantly
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              AI-generated resumes and cover letters tailored to your goals in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/signup"
                className="btn-primary px-8 py-4 text-lg"
              >
                Try It Free
              </Link>
              <Link 
                href="#how-it-works"
                className="btn-secondary px-8 py-4 text-lg"
              >
                See Examples
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12">
              <p className="text-sm font-medium text-gray-500 mb-4">TRUSTED BY STUDENTS AT</p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-70">
                <span className="text-gray-700 font-semibold">Harvard</span>
                <span className="text-gray-700 font-semibold">Stanford</span>
                <span className="text-gray-700 font-semibold">MIT</span>
                <span className="text-gray-700 font-semibold">Berkeley</span>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="glass-card p-2 rounded-2xl shadow-2xl transform rotate-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-gray-500 mx-auto">resume_john_doe.pdf</div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Resume header */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
                      <p className="text-[#43B581] font-medium">Senior Software Engineer</p>
                    </div>
                    
                    {/* Experience section */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">EXPERIENCE</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between">
                            <span className="font-medium">Senior Software Engineer</span>
                            <span className="text-sm text-gray-500">2020 - Present</span>
                          </div>
                          <div className="text-sm text-gray-600">Tech Company Inc.</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">SKILLS</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'].map((skill) => (
                          <span key={skill} className="text-xs bg-[#43B581]/10 text-[#43B581] px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#6366F1]/20 rounded-full mix-blend-multiply filter blur-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#FFB703]/20 rounded-full mix-blend-multiply filter blur-2xl -z-10" />
          </div>
        </div>
        
        {/* How it works section */}
        <div id="how-it-works" className="mt-32 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It <span className="text-[#43B581]">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Paste the job post",
                description: "Copy and paste the job description you're applying for.",
                icon: (
                  <svg className="w-8 h-8 text-[#43B581]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                )
              },
              {
                step: 2,
                title: "Tell us about yourself",
                description: "Share your experience, skills, and what makes you unique.",
                icon: (
                  <svg className="w-8 h-8 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )
              },
              {
                step: 3,
                title: "Get your AI-crafted resume",
                description: "Receive a tailored resume and cover letter in seconds.",
                icon: (
                  <svg className="w-8 h-8 text-[#FFB703]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                )
              }
            ].map((item) => (
              <div key={item.step} className="glass-card p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to land your dream job?</h3>
            <Link 
              href="/signup" 
              className="btn-primary inline-block px-8 py-4 text-lg"
            >
              Generate Your Resume Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
