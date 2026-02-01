// ============================================================
// MANAGE CONTENT PAGE - ADMIN
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../utils/api';

const ManageContent = () => {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await adminAPI.getAllContent();
      setContent(response.data.content);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contentId) => {
    try {
      await adminAPI.deleteContent(contentId);
      setContent(content.filter(c => c.id !== contentId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete content');
    }
  };

  const filteredContent = filter === 'all'
    ? content
    : content.filter(item => item.content_type === filter);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  const types = ['all', 'agriculture', 'festival', 'event', 'announcement'];
  const getTypeEmoji = (type) => {
    const emojis = {
      agriculture: '🌾',
      festival: '🎉',
      event: '📅',
      announcement: '📢'
    };
    return emojis[type] || '📝';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">📝 Manage Content</h1>
        <Link to="/admin/add-content" className="btn-secondary">➕ Add New Content</Link>
      </div>

      {error && <div className="alert-error mb-4">{error}</div>}

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === type
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {type === 'all' ? 'All' : `${getTypeEmoji(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>
        ))}
      </div>

      {filteredContent.length > 0 ? (
        <div className="space-y-4">
          {filteredContent.map(item => (
            <div key={item.id} className="card p-6 border-l-4 border-orange-500">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-700 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description?.substring(0, 100)}...</p>
                  <p className="text-xs text-gray-500">
                    {getTypeEmoji(item.content_type)} {item.content_type.toUpperCase()} | By: {item.created_by_name} | {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/edit-content/${item.id}`}
                    className="btn-primary py-2 px-3 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Delete Confirmation */}
              {deleteConfirm === item.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
                    <p className="mb-4 font-semibold">Are you sure you want to delete this content?</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 text-lg">No content yet</p>
          <Link to="/admin/add-content" className="btn-primary mt-4 inline-block">Add Your First Content</Link>
        </div>
      )}
    </div>
  );
};

export default ManageContent;
