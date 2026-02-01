// ============================================================
// ADD/EDIT IMAGE PAGE - ADMIN
// ============================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAPI } from '../utils/api';

const AddEditImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEdit && !formData.image) {
        setError('Please select an image');
        setLoading(false);
        return;
      }

      if (isEdit) {
        // Edit mode - only update text fields
        await adminAPI.editImage(id, {
          title: formData.title,
          description: formData.description,
          category: formData.category
        });
        setSuccess('Image updated successfully!');
      } else {
        // Add mode - upload with image
        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('description', formData.description);
        formDataObj.append('category', formData.category);
        formDataObj.append('image', formData.image);

        await adminAPI.addImage(formDataObj);
        setSuccess('Image uploaded successfully!');
      }

      setTimeout(() => navigate('/admin/images'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8">
          {isEdit ? '✏️ Edit Image' : '📸 Add New Image'}
        </h1>

        {error && <div className="alert-error mb-4">{error}</div>}
        {success && <div className="alert-success mb-4">{success}</div>}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Image title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Image description"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="general">General</option>
                <option value="agriculture">Agriculture</option>
                <option value="cultural">Cultural</option>
                <option value="events">Events</option>
              </select>
            </div>

            {!isEdit && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image *</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form-input"
                  accept="image/*"
                  required
                />
              </div>
            )}

            {imagePreview && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Preview</label>
                <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg" />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Image' : 'Upload Image'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/images')}
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

export default AddEditImage;
