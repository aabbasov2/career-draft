'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
  href: string;
  popular?: boolean;
  priceId?: string;
};

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying us out',
      features: [
        '1 Resume',
        '1 Cover Letter',
        'Basic Templates',
        'Limited Support'
      ],
      cta: 'Get Started',
      href: '/signup',
      popular: false
    },
    {
      name: 'Quick Draft',
      price: '$4.99',
      description: 'Most popular choice',
      features: [
        '3 Resumes',
        '3 Cover Letters',
        'All Templates',
        'PDF Export',
        'Email Delivery',
        'Priority Support'
      ],
      featured: true,
      cta: 'Get Started',
      href: '/signup?plan=quickdraft',
      popular: true,
      priceId: 'price_123',
    },
    {
      name: 'Pro Unlimited',
      price: '$9.99',
      description: 'For power users',
      features: [
        'Unlimited Resumes',
        'Unlimited Cover Letters',
        'All Templates',
        'PDF Export',
        'Email Delivery',
        'Unlimited Rewrites',
        '24/7 Priority Support'
      ],
      cta: 'Go Pro',
      href: '/signup?plan=pro',
      popular: false,
      priceId: 'price_456',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 sm:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 transform">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 transform">
        <div className="w-96 h-96 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-8">
            ✨ Limited Time: All plans include bonus templates
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, no contracts.
          </p>
        </div>
        
        <div className="mt-20 flex flex-col items-center justify-center gap-8 md:flex-row">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-500 scale-105' 
                  : 'bg-white/80 hover:bg-white'
              } ${hoveredPlan === plan.name ? 'transform scale-102' : ''}`}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    🔥 Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold leading-8 text-gray-900 mb-2">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <p className="text-sm font-medium text-blue-600 bg-blue-100 rounded-full px-3 py-1 inline-block">
                    {plan.description}
                  </p>
                )}
              </div>
              
              <div className="text-center my-8">
                <div className="flex items-baseline justify-center gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.name !== 'Free' && (
                    <span className="text-lg font-semibold leading-6 text-gray-600">/month</span>
                  )}
                </div>
                {plan.name !== 'Free' && (
                  <p className="text-sm text-gray-500 mt-1">Billed monthly, cancel anytime</p>
                )}
              </div>

              <ul
                role="list"
                className="space-y-4 text-sm leading-6 text-gray-700 flex-1"
              >
                {plan.features.map((feature, index) => (
                  <li key={feature} className="flex gap-x-3 items-start">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      plan.popular ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <CheckIcon
                        className={`h-3 w-3 ${plan.popular ? 'text-blue-600' : 'text-green-600'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={plan.href}
                className={`mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold leading-6 transition-all duration-200 transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus-visible:outline-blue-600 shadow-blue-200'
                    : 'text-blue-600 bg-white ring-2 ring-inset ring-blue-600 hover:bg-blue-50 hover:ring-blue-700 hover:text-blue-700 shadow-blue-100'
                }`}
              >
                {plan.cta}
                <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {[
              {
                question: "Can I try before I buy?",
                answer: "Absolutely! Our free plan includes 3 resume generations so you can test out our platform before committing to a paid plan."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to the paid features until the end of your billing period."
              },
              {
                question: "Do you offer discounts for students?",
                answer: "Yes! We offer a 50% discount for students with a valid .edu email address. Contact our support team to claim your discount."
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {faq.question}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison Table */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Compare plans
          </h3>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Features
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      Free
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-blue-600 bg-blue-50">
                      $4.99
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      $9.99/mo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: "Resume Generator", free: true, quick: true, pro: true },
                    { feature: "Cover Letter Generator", free: true, quick: true, pro: true },
                    { feature: "PDF Export", free: false, quick: true, pro: true },
                    { feature: "Email Delivery", free: false, quick: true, pro: true },
                    { feature: "Unlimited Rewrites", free: false, quick: false, pro: true }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.free ? (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <span className="text-red-500 text-lg">✕</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-blue-50/50">
                        {row.quick ? (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <span className="text-red-500 text-lg">✕</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.pro ? (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <span className="text-red-500 text-lg">✕</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-800">
                100% money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}