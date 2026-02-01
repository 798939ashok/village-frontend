// ============================================================
// ADMIN DASHBOARD - MAIN PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, contentAPI } from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, imagesRes, contentRes] = await Promise.all([
        contentAPI.getDashboardStats(),
        adminAPI.getImages(),
        adminAPI.getAllContent()
      ]);
      setStats(statsRes.data);
      setImages(imagesRes.data.images);
      setContent(contentRes.data.content);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-2">🛠️ Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage village content and media</p>

      {error && <div className="alert-error mb-4">{error}</div>}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <h3 className="text-3xl font-bold text-blue-700">{stats?.totalUsers || 0}</h3>
          <p className="text-gray-600">Registered Users</p>
        </div>
        <div className="card p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-3xl font-bold text-green-700">{images.length}</h3>
          <p className="text-gray-600">Total Images</p>
        </div>
        <div className="card p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100">
          <h3 className="text-3xl font-bold text-orange-700">{content.length}</h3>
          <p className="text-gray-600">Content Items</p>
        </div>
        <div className="card p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <h3 className="text-3xl font-bold text-purple-700">{stats?.latestAnnouncements?.length || 0}</h3>
          <p className="text-gray-600">Announcements</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link to="/admin/images" className="btn-primary text-center py-4">
          📸 Manage Images
        </Link>
        <Link to="/admin/add-image" className="btn-secondary text-center py-4">
          ➕ Add Image
        </Link>
        <Link to="/admin/content" className="btn-primary text-center py-4">
          📝 Manage Content
        </Link>
        <Link to="/admin/add-content" className="btn-secondary text-center py-4">
          ➕ Add Content
        </Link>
      </div>

      {/* Recent Images */}
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Recent Images</h2>
        {images.length > 0 ? (
          <div className="grid grid-responsive">
            {images.slice(0, 6).map(image => (
              <div key={image.id} className="border rounded-lg overflow-hidden">
                <img
                  src={`https://village-backend-q6jx.onrender.com/${image.image_path}`}
                  alt={image.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-bold text-sm">{image.title}</h3>
                  <p className="text-xs text-gray-600">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No images yet</p>
        )}
        <Link to="/admin/images" className="text-green-700 hover:text-green-900 font-semibold mt-4 inline-block">
          View All Images →
        </Link>
      </div>

      {/* Recent Content */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Recent Content</h2>
        {content.length > 0 ? (
          <div className="space-y-3">
            {content.slice(0, 5).map(item => (
              <div key={item.id} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.content_type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No content yet</p>
        )}
        <Link to="/admin/content" className="text-green-700 hover:text-green-900 font-semibold mt-4 inline-block">
          View All Content →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
