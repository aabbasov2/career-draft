import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon } from '@heroicons/react/24/outline';

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

const team = [
  {
    name: 'Aziz Abbasov',
    role: 'Founder & CEO',
    avatar: '/team/aziz.jpg',
    bio: 'After struggling with job applications himself, Aziz created CareerDraft to make the job search process more accessible for everyone.'
  },
  {
    name: 'Taylor Chen',
    role: 'Head of AI',
    avatar: '/team/taylor.jpg',
    bio: 'Taylor leads our AI development, ensuring our algorithms help job seekers highlight their best qualities.'
  },
  {
    name: 'Jordan Lee',
    role: 'Career Coach',
    avatar: '/team/jordan.jpg',
    bio: 'With 8+ years in HR, Jordan ensures our resume advice aligns with what hiring managers actually want to see.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-indigo-900/90" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            We believe in your potential
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
            CareerDraft was built on one simple idea: students shouldn't need a $300 coach to land their first job.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 text-gray-600 space-y-6">
                <p className="text-lg">
                  We're leveling the playing field for job seekers everywhere by making professional resume building accessible to all.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 font-medium">
                    "We believe that everyone deserves a fair shot at their dream job, regardless of their background or connections."
                  </p>
                </div>
                <p>
                  Our AI-powered tools are designed to help you showcase your skills and experience in the best possible light, without breaking the bank.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-blue-50 rounded-xl p-8">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Our Values</h3>
                      <ul className="mt-4 space-y-3 text-left">
                        {["Accessibility for all", "Student-first approach", "Transparent pricing", "Continuous improvement"].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Story */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                From Frustration to Solution
              </h2>
              <div className="mt-6 text-gray-600 space-y-6">
                <p>
                  Hi, I'm Aziz. I remember the frustration of being a student, spending countless hours perfecting my resume only to receive no responses. I couldn't afford expensive career coaches that my peers were using, and I knew there had to be a better way.
                </p>
                <p>
                  After landing my first job through sheer persistence, I made it my mission to create a solution that would make professional resume building accessible to everyone, regardless of their financial situation.
                </p>
                <p>
                  That's why we've built CareerDraft - to give every student and job seeker the tools they need to put their best foot forward, without the hefty price tag.
                </p>
                <div className="mt-8">
                  <p className="text-lg font-medium text-gray-900">Aziz Abbasov</p>
                  <p className="text-blue-600">Founder & CEO, CareerDraft</p>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-white p-1 rounded-xl shadow-lg">
                <div className="h-64 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-gray-500">Aziz's Photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <span className="text-gray-500 text-xl">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                      <p className="text-blue-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Passionate people behind CareerDraft
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <span className="text-gray-400 text-4xl">{person.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-blue-600 mt-1">{person.role}</p>
                  <p className="mt-4 text-gray-600">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your job search?</span>
            <span className="block text-blue-100">Create your professional resume in minutes.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started Free
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-blue-700 bg-blue-600"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
