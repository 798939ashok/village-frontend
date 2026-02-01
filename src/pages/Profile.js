// ============================================================
// USER PROFILE PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { userAPI } from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.user);
      setFormData({ name: response.data.user.name });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    setFormData({ name: e.target.value });
    setError('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await userAPI.changePassword(passwordData);
      setSuccess('Password changed successfully!');
      setPasswordMode(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8">👤 My Profile</h1>

        {error && <div className="alert-error mb-4">{error}</div>}
        {success && <div className="alert-success mb-4">{success}</div>}

        {/* Profile Card */}
        <div className="card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-700">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="text-sm text-gray-500">
                Role: <span className="font-semibold text-green-700">{profile?.role?.toUpperCase()}</span>
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <p className="text-gray-600 text-sm">
            Member since: {new Date(profile?.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Edit Name Section */}
        <div className="card p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-700">Edit Name</h3>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
          ) : (
            <p className="text-gray-700">{profile?.name}</p>
          )}
        </div>

        {/* Change Password Section */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-700">Change Password</h3>
            <button
              onClick={() => setPasswordMode(!passwordMode)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {passwordMode ? 'Cancel' : 'Change'}
            </button>
          </div>

          {passwordMode && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">Update Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
