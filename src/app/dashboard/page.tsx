'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { 
  UserCircleIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  fullName?: string;
  jobTitle?: string;
  skills?: string[];
  workExperience?: string;
  email?: string;
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
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Documents',
      value: savedDocuments.length,
      icon: DocumentTextIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Resumes Created',
      value: savedDocuments.filter(doc => doc.type === 'resume').length,
      icon: UserCircleIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Cover Letters',
      value: savedDocuments.filter(doc => doc.type === 'cover-letter').length,
      icon: BriefcaseIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'This Month',
      value: savedDocuments.filter(doc => {
        const docDate = new Date(doc.createdAt);
        const now = new Date();
        return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
      }).length,
      icon: ChartBarIcon,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const getPersonalizedGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return 'Good morning!';
    } else if (hour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  const getLastActivityText = () => {
    if (savedDocuments.length === 0) {
      return 'No activity yet';
    }
    const lastDoc = savedDocuments[0];
    const lastActivityDate = new Date(lastDoc.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActivityDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/5 z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-0"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 z-0"></div>

      <main className="relative z-10 max-w-7xl mx-auto pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="glass-card p-8 mb-8 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white mr-4">
                  <SparklesIcon className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {profile?.fullName || 'there'}! 👋
                  </h1>
                  <p className="text-gray-600 text-lg mt-1">
                    {getPersonalizedGreeting()}
                  </p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>{savedDocuments.length} documents created</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>Last activity: {getLastActivityText()}</span>
                </div>
                {profile?.jobTitle && profile.jobTitle !== 'Not set' && (
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" />
                    <span>{profile.jobTitle}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:block ml-8">
              <div className="space-y-3">
                <Link
                  href="/dashboard/jobs"
                  className="btn-primary inline-flex items-center w-full justify-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create New Document
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
                {savedDocuments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">
                    Start your career journey today!
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile CTA */}
          <div className="md:hidden mt-6">
            <Link
              href="/dashboard/jobs"
              className="btn-primary w-full inline-flex items-center justify-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Document
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className="glass-card p-6 animate-fadeInUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
                <Link 
                  href="/dashboard/jobs" 
                  className="text-primary hover:text-secondary font-medium text-sm flex items-center"
                >
                  View all
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {savedDocuments.length > 0 ? (
                <div className="space-y-4">
                  {savedDocuments.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200">
                      <div className={`p-3 rounded-xl ${
                        doc.type === 'resume' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-purple-600'
                      } text-white`}>
                        {doc.type === 'resume' ? (
                          <DocumentTextIcon className="h-5 w-5" />
                        ) : (
                          <BriefcaseIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">
                          {doc.type === 'resume' ? 'Resume' : 'Cover Letter'}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-all duration-200">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                  <p className="text-gray-600 mb-6">Create your first resume or cover letter to get started</p>
                  <Link
                    href="/dashboard/jobs"
                    className="btn-primary inline-flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Document
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="glass-card p-6 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{profile?.fullName || 'Not set'}</p>
                    <p className="text-xs text-gray-600">Full Name</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{profile?.jobTitle || 'Not set'}</p>
                    <p className="text-xs text-gray-600">Job Title</p>
                  </div>
                </div>
              </div>
              <Link
                href="/profile"
                className="mt-4 w-full btn-outline text-center block"
              >
                Edit Profile
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/jobs"
                  className="w-full flex items-center p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                    <DocumentTextIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Create Resume</p>
                    <p className="text-xs text-gray-600">AI-powered resume builder</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className="w-full flex items-center p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200"
                >
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
                    <BriefcaseIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Cover Letter</p>
                    <p className="text-xs text-gray-600">Tailored to job description</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
