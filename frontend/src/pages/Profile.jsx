import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUser } from '../utils/auth';

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const data = { email };
      if (password) data.password = password;

      await api.put(`/users/${user.id}`, data);
      setSuccess('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-dark-text mb-8">Profile Settings</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {/* User Info */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Username</p>
                <p className="font-semibold text-dark-text">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="font-semibold text-dark-text capitalize">{user?.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="font-semibold text-dark-text">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-text mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-text mb-2">New Password (Optional)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-text mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-white py-3 rounded-full font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
