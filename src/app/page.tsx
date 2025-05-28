'use client';

import dynamic from 'next/dynamic';

// Import the client component
const HomeContent = dynamic(() => import('./HomeContent'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
});

export default function Home() {
  return <HomeContent />;
}
