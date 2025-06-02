'use client';

import { CheckIcon, SparklesIcon, StarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

type Plan = {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
  href: string;
  popular?: boolean;
  priceId?: string;
  icon: any;
  badge?: string;
};

const faqs = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 1 resume, 1 cover letter, access to basic templates, and community support. It's perfect for trying out our platform."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. You'll continue to have access to your paid features until the end of your billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll provide a full refund within 30 days of purchase."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties."
  }
];

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans: Plan[] = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying us out',
      features: [
        '1 Resume',
        '1 Cover Letter',
        'Basic Templates',
        'Community Support',
        'Basic AI Suggestions'
      ],
      cta: 'Get Started',
      href: '/signup',
      popular: false,
      icon: StarIcon
    },
    {
      name: 'Quick Draft',
      price: '$4.99',
      originalPrice: '$9.99',
      period: 'one-time',
      description: 'Most popular choice for students',
      features: [
        '3 Resumes',
        '3 Cover Letters',
        'All Premium Templates',
        'PDF Export',
        'Email Delivery',
        'Priority Support',
        'Advanced AI Suggestions',
        'ATS Optimization'
      ],
      featured: true,
      cta: 'Get Started',
      href: '/signup?plan=quickdraft',
      popular: true,
      icon: RocketLaunchIcon,
      badge: 'Most Popular'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious job seekers',
      features: [
        'Unlimited Resumes',
        'Unlimited Cover Letters',
        'All Premium Templates',
        'PDF Export',
        'Email Delivery',
        'Priority Support',
        'Advanced AI Suggestions',
        'ATS Optimization',
        'LinkedIn Profile Optimization',
        'Interview Preparation',
        'Salary Negotiation Guide'
      ],
      cta: 'Start Free Trial',
      href: '/signup?plan=pro',
      popular: false,
      icon: SparklesIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-purple-600">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Simple, <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">transparent</span> pricing
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-100 leading-relaxed">
              Choose the plan that works for you. Start free, upgrade when you need more features.
            </p>
            <div className="mt-8 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
              <SparklesIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative group animate-fadeInUp ${
                  plan.featured 
                    ? 'transform scale-105 z-10' 
                    : hoveredPlan === plan.name 
                      ? 'transform scale-105' 
                      : ''
                } transition-all duration-300`}
                style={{animationDelay: `${index * 0.2}s`}}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className={`glass-card p-8 h-full ${
                  plan.featured 
                    ? 'border-2 border-primary shadow-2xl' 
                    : ''
                }`}>
                  <div className="text-center">
                    <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
                      plan.featured 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-center">
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice}</span>
                        )}
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      </div>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    
                    <Link
                      href={plan.href}
                      className={`w-full mb-8 ${
                        plan.featured 
                          ? 'btn-primary' 
                          : 'btn-secondary'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-center mb-4">What's included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose <span className="text-gradient">CareerDraft</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another resume builder. We're your career advancement partner.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: SparklesIcon,
                title: 'AI-Powered Optimization',
                description: 'Our advanced AI analyzes your resume and suggests improvements to beat ATS systems and impress recruiters.'
              },
              {
                icon: RocketLaunchIcon,
                title: 'Student-Friendly Pricing',
                description: 'Affordable plans designed for students and new graduates. No hidden fees, no long-term commitments.'
              },
              {
                icon: CheckIcon,
                title: 'Proven Results',
                description: 'Over 10,000 students have landed their dream jobs using CareerDraft. Join our success stories.'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 text-center hover-lift animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and features
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <div className={`transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
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
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who've already transformed their careers with CareerDraft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-secondary bg-white text-primary hover:bg-gray-50">
                Start Free Today
              </Link>
              <Link href="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}