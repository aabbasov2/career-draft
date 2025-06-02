import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon, SparklesIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Recent Graduate',
    content: 'CareerDraft helped me land my first job out of college. The AI suggestions made my resume stand out from hundreds of applicants!',
    avatar: '/avatars/sarah.jpg'
  },
  {
    name: 'Michael T.',
    role: 'Career Changer',
    content: 'After 5 years in retail, I wanted to switch to tech. CareerDraft helped me translate my experience into tech-friendly language that got me interviews.',
    avatar: '/avatars/michael.jpg'
  },
  {
    name: 'Priya M.',
    role: 'International Student',
    content: 'As an international student, I struggled with US resume formats. CareerDraft made it so easy to create a professional resume that helped me get an internship.',
    avatar: '/avatars/priya.jpg'
  }
];

const values = [
  {
    icon: HeartIcon,
    title: 'Student-First Approach',
    description: 'Every feature is designed with students and new graduates in mind.'
  },
  {
    icon: SparklesIcon,
    title: 'AI-Powered Excellence',
    description: 'Cutting-edge AI technology to help you craft the perfect resume.'
  },
  {
    icon: CheckIcon,
    title: 'Accessibility for All',
    description: 'Professional resume building should be available to everyone, not just the privileged few.'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Career Success',
    description: 'We measure our success by the careers we help launch.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              We believe in your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                potential
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-100 leading-relaxed">
              CareerDraft was built on one simple idea: students shouldn't need a $300 coach to land their first job.
            </p>
            <div className="mt-10">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                Join Our Mission
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <div className="text-gray-600 space-y-6">
                <p className="text-lg leading-relaxed">
                  We're leveling the playing field for job seekers everywhere by making professional resume building accessible to all.
                </p>
                <div className="glass-card p-6 border-l-4 border-primary">
                  <p className="text-primary font-semibold text-lg">
                    "We believe that everyone deserves a fair shot at their dream job, regardless of their background or connections."
                  </p>
                </div>
                <p className="text-lg leading-relaxed">
                  Our AI-powered tools are designed to help you showcase your skills and experience in the best possible light, without breaking the bank.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 animate-slideInRight">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center group hover-lift">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Story */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 animate-fadeInUp">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From <span className="text-gradient">Frustration</span> to Solution
              </h2>
              <div className="text-gray-600 space-y-6">
                <p className="text-lg leading-relaxed">
                  Hi, I'm Aziz. I remember the frustration of being a student, spending countless hours perfecting my resume only to receive no responses. I couldn't afford expensive career coaches that my peers were using, and I knew there had to be a better way.
                </p>
                <p className="text-lg leading-relaxed">
                  After landing my first job through sheer persistence, I made it my mission to create a solution that would make professional resume building accessible to everyone, regardless of their financial situation.
                </p>
                <p className="text-lg leading-relaxed">
                  That's why we've built CareerDraft - to give every student and job seeker the tools they need to put their best foot forward, without the hefty price tag.
                </p>
                <div className="glass-card p-6 mt-8">
                  <p className="text-xl font-semibold text-gray-900">Aziz Abbasov</p>
                  <p className="text-primary font-medium">Founder & CEO, CareerDraft</p>
                  <p className="text-gray-600 mt-2">Building the future of accessible career tools</p>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 animate-float">
              <div className="glass-card p-2">
                <div className="h-80 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                  <div className="relative text-center p-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AZ</span>
                    </div>
                    <p className="text-gray-600 font-medium">Founder's Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students and professionals who've transformed their careers with CareerDraft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6 hover-lift animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals who've already transformed their careers with CareerDraft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-secondary bg-white text-primary hover:bg-gray-50">
                Get Started Free
              </Link>
              <Link href="/pricing" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
