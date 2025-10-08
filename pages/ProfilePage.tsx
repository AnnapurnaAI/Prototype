
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { DietaryPreference, Gender, UserProfile } from '../types';

const ProfilePage: React.FC = () => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <header className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences.</p>
        </div>
        {!isEditing && (
            <button
                onClick={() => setIsEditing(true)}
                className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-accent transition-colors"
            >
                Edit Profile
            </button>
        )}
      </header>
      
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text" name="name" id="name" value={formData.name} onChange={handleChange} required disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number" name="age" id="age" value={formData.age} onChange={handleChange} required min="1" disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender" id="gender" value={formData.gender} onChange={handleChange} disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-primary focus:border-primary"
            >
              {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">Dietary Preference</label>
            <select
              name="dietaryPreference" id="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-primary focus:border-primary"
            >
              {Object.values(DietaryPreference).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          {isEditing && (
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => { setIsEditing(false); setFormData(userProfile); }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
         {showSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                Profile updated successfully!
            </div>
         )}
      </div>
    </div>
  );
};

export default ProfilePage;
