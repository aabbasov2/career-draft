'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import FormInput from '@/components/FormInput';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';

interface UserProfile {
  fullName: string;
  jobTitle: string;
  skills: string[];
  workExperience: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    jobTitle: '',
    skills: [],
    workExperience: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Validate required fields
      if (!profile.fullName.trim() || !profile.jobTitle.trim() || !profile.workExperience.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare profile data
      const profileData = {
        ...profile,
        email: user.email,
        updatedAt: new Date().toISOString(),
      };

      // Save profile data to Firestore
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      
      // Add a small delay to ensure the document is saved before redirecting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setProfile(prev => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about yourself to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <FormInput
              label="Full Name"
              id="fullName"
              name="fullName"
              type="text"
              required
              value={profile.fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
            />

            <FormInput
              label="Job Title"
              id="jobTitle"
              name="jobTitle"
              type="text"
              required
              value={profile.jobTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
            />

            <FormInput
              label="Skills (comma-separated)"
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g. JavaScript, React, Node.js"
              required
              value={profile.skills.join(', ')}
              onChange={handleSkillsChange}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Work Experience
              </label>
              <textarea
                id="workExperience"
                name="workExperience"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
                value={profile.workExperience}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile(prev => ({ ...prev, workExperience: e.target.value }))}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Continue to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
