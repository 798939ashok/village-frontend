// ============================================================
// ADD/EDIT CONTENT PAGE - ADMIN
// ============================================================

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAPI } from '../utils/api';

const AddEditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    contentType: 'event',
    title: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const contentTypes = [
    { value: 'event', label: '📅 Event' },
    { value: 'festival', label: '🎉 Festival' },
    { value: 'agriculture', label: '🌾 Agriculture' },
    { value: 'announcement', label: '📢 Announcement' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await adminAPI.editContent(id, formData);
        setSuccess('Content updated successfully!');
      } else {
        await adminAPI.addContent(formData);
        setSuccess('Content added successfully!');
      }

      setTimeout(() => navigate('/admin/content'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8">
          {isEdit ? '✏️ Edit Content' : '➕ Add New Content'}
        </h1>

        {error && <div className="alert-error mb-4">{error}</div>}
        {success && <div className="alert-success mb-4">{success}</div>}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Content Type *</label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                className="form-select"
                required
              >
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Content title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Detailed description"
                rows="8"
                required
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Content' : 'Add Content'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/content')}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditContent;
