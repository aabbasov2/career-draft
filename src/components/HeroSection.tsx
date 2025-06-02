import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#43B581]/5 via-white to-[#6366F1]/5 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FFB703]/10 via-transparent to-transparent -z-10" />
      
      {/* Enhanced floating shapes with better animation */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-[#43B581]/20 to-[#10B981]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-[#FFB703]/20 to-[#F59E0B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced hero content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#43B581]/10 to-[#6366F1]/10 text-[#43B581] border border-[#43B581]/20 backdrop-blur-sm">
                ✨ Powered by GPT-4o AI Technology
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Get Drafted by Your{' '}
              <span className="bg-gradient-to-r from-[#43B581] via-[#10B981] to-[#6366F1] bg-clip-text text-transparent">
                Dream Job
              </span>{' '}
              — Instantly
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              AI-generated resumes and cover letters tailored to your goals in seconds. 
              <span className="font-semibold text-gray-700"> Stand out from the crowd</span> with personalized, ATS-optimized documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link 
                href="/signup"
                className="group btn-primary px-8 py-4 text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Try It Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link 
                href="#how-it-works"
                className="btn-secondary px-8 py-4 text-lg group"
              >
                <span className="flex items-center">
                  See Examples
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Enhanced trust badges */}
            <div className="mt-12">
              <p className="text-sm font-medium text-gray-500 mb-6 tracking-wide">TRUSTED BY STUDENTS AT</p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-70">
                {['Harvard', 'Stanford', 'MIT', 'Berkeley', 'Yale'].map((university) => (
                  <div key={university} className="group cursor-pointer">
                    <span className="text-gray-700 font-semibold text-lg group-hover:text-[#43B581] transition-colors duration-200">
                      {university}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced hero image with better styling */}
          <div className="relative">
            <div className="glass-card p-3 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100/50 shadow-inner">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200/50 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                  </div>
                  <div className="text-xs text-gray-500 mx-auto font-medium">resume_john_doe.pdf</div>
                  <div className="text-xs text-[#43B581] font-semibold">✓ ATS Optimized</div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Enhanced resume header */}
                    <div className="text-center border-b border-gray-100 pb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#43B581] to-[#6366F1] rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">JD</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">John Doe</h3>
                      <p className="text-[#43B581] font-semibold text-lg">Senior Software Engineer</p>
                      <p className="text-gray-600 text-sm mt-2">john.doe@email.com • +1 (555) 123-4567</p>
                    </div>
                    
                    {/* Enhanced experience section */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 border-b-2 border-[#43B581] pb-2 mb-4 tracking-wide">EXPERIENCE</h4>
                      <div className="space-y-4">
                        <div className="border-l-2 border-[#43B581]/30 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold text-gray-900">Senior Software Engineer</span>
                              <div className="text-sm text-[#43B581] font-medium">Tech Company Inc.</div>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">2020 - Present</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Led development of scalable web applications...</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced skills */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 border-b-2 border-[#6366F1] pb-2 mb-4 tracking-wide">SKILLS</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL', 'Python'].map((skill) => (
                          <span key={skill} className="text-xs bg-gradient-to-r from-[#43B581]/10 to-[#6366F1]/10 text-gray-700 px-3 py-1.5 rounded-full border border-[#43B581]/20 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-full mix-blend-multiply filter blur-2xl -z-10 animate-pulse" />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-r from-[#FFB703]/20 to-[#F59E0B]/20 rounded-full mix-blend-multiply filter blur-2xl -z-10 animate-pulse animation-delay-2000" />
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-100">
              <span className="text-xs font-semibold text-[#43B581]">✓ AI Generated</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-100">
              <span className="text-xs font-semibold text-[#6366F1]">⚡ 30 seconds</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced how it works section */}
        <div id="how-it-works" className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-[#43B581] to-[#6366F1] bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your job search with our AI-powered platform in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Paste the job post",
                description: "Copy and paste the job description you're applying for. Our AI analyzes every detail.",
                icon: (
                  <svg className="w-8 h-8 text-[#43B581]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                ),
                color: "from-green-400 to-blue-500"
              },
              {
                step: 2,
                title: "Tell us about yourself",
                description: "Share your experience, skills, and what makes you unique. The more details, the better.",
                icon: (
                  <svg className="w-8 h-8 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                ),
                color: "from-indigo-400 to-purple-500"
              },
              {
                step: 3,
                title: "Get your AI-crafted resume",
                description: "Receive a tailored resume and cover letter in seconds, perfectly matched to the job.",
                icon: (
                  <svg className="w-8 h-8 text-[#FFB703]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ),
                color: "from-orange-400 to-yellow-500"
              }
            ].map((item) => (
              <div key={item.step} className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-60`} />
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-[#43B581]/5 to-[#6366F1]/5 rounded-3xl p-12 border border-gray-100">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Ready to land your dream job?</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of successful job seekers who've transformed their careers with AI-powered resumes
              </p>
              <Link 
                href="/signup" 
                className="group btn-primary inline-flex items-center px-10 py-5 text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Generate Your Resume Now</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
