'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface UserProfile {
  fullName?: string;
  jobTitle?: string;
  skills?: string[];
  workExperience?: string;
}

interface GeneratedDocument {
  id: string;
  type: 'resume' | 'cover-letter';
  content: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  fullName?: string;
  jobTitle?: string;
  skills?: string[];
  workExperience?: string;
}

interface GeneratedDocument {
  id: string;
  type: 'resume' | 'cover-letter';
  content: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedDocuments, setSavedDocuments] = useState<GeneratedDocument[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Set default profile with email
        setProfile({
          fullName: user?.email?.split('@')[0] || 'User',
          email: user?.email || '',
          jobTitle: 'Not set',
          skills: []
        } as UserProfile);

        // Fetch saved documents
        const documentsQuery = query(
          collection(db, `users/${user.uid}/documents`),
          orderBy('createdAt', 'desc')
        );
        const documentsSnapshot = await getDocs(documentsQuery);
        const docs = documentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GeneratedDocument[];
        setSavedDocuments(docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Career Draft AI</h1>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600">Dashboard</Link>
              <Link href="/dashboard/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Jobs</Link>
              <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Edit Profile</Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                if (logout) {
                  logout();
                  router.push('/login');
                }
              }}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's an overview of your account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {profile?.fullName || 'Not set'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Job Title:</span> {profile?.jobTitle || 'Not set'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-4">
                  {savedDocuments.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {savedDocuments.slice(0, 3).map((doc) => (
                        <li key={doc.id} className="py-2">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                <span className="text-xs font-medium leading-none text-blue-800">
                                  {doc.type === 'resume' ? 'R' : 'CL'}
                                </span>
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {doc.type === 'resume' ? 'Resume' : 'Cover Letter'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(doc.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content generation moved to /dashboard/jobs page */}
        </div>
      </main>
    </div>
  );
}
