'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
  priceId?: string;
};

export default function PricingSection() {
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
      priceId: 'price_123', // Replace with your actual Stripe price ID
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
      priceId: 'price_456', // Replace with your actual Stripe price ID
    },
  ];

  // This function will be called when a user clicks the purchase button
  const handlePurchase = (priceId?: string) => {
    if (!priceId) {
      // Handle free plan selection
      window.location.href = '/signup';
      return;
    }
    
    // Here you would typically call your API to create a Stripe checkout session
    // For now, we'll just log the price ID
    console.log('Initiating purchase for price ID:', priceId);
    // Example: createCheckoutSession(priceId);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. No hidden fees, no contracts.
          </p>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 ${
                plan.featured ? 'bg-primary/10 ring-2 ring-primary' : ''
              }`}
            >
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {plan.name}
              </h3>
              {plan.featured && (
                <p className="mt-2 text-sm font-medium text-primary">
                  {plan.description}
                </p>
              )}
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {plan.price}
                </span>
                {plan.name !== 'Free' && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                )}
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(plan.priceId)}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.featured
                    ? 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary'
                    : 'text-primary ring-1 ring-inset ring-primary hover:ring-primary-dark hover:text-primary-dark'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison Table */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">
            Compare plans
          </h3>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Features
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                        Free
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-primary bg-primary/10">
                        $4.99
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                        $9.99/mo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Resume Generator
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center bg-primary/5">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Cover Letter Generator
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center bg-primary/5">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        PDF Export
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center bg-primary/5">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Email Delivery
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center bg-primary/5">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Unlimited Rewrites
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center bg-primary/5">
                        <span className="text-red-500">✕</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              100% money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
