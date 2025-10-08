
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DietaryPreference, Gender, UserProfile } from '../types';
import LeafIcon from '../components/icons/LeafIcon';
import { UserContext } from '../App';

const LoginPage: React.FC = () => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 25,
    gender: Gender.FEMALE,
    dietaryPreference: DietaryPreference.VEG,
  });

  if (userProfile.name) {
    return <Navigate to="/" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <LeafIcon className="w-12 h-12 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Welcome to Annapurna.ai</h1>
          <p className="text-gray-600">Let's get to know you better.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">Dietary Preference</label>
            <select
              name="dietaryPreference"
              id="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {Object.values(DietaryPreference).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Start Tracking
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
