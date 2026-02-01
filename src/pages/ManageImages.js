// ============================================================
// MANAGE IMAGES PAGE - ADMIN
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../utils/api';

const ManageImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await adminAPI.getImages();
      setImages(response.data.images);
    } catch (err) {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await adminAPI.deleteImage(imageId);
      setImages(images.filter(img => img.id !== imageId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete image');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">📸 Manage Images</h1>
        <Link to="/admin/add-image" className="btn-secondary">➕ Add New Image</Link>
      </div>

      {error && <div className="alert-error mb-4">{error}</div>}

      {images.length > 0 ? (
        <div className="grid grid-responsive">
          {images.map(image => (
            <div key={image.id} className="card overflow-hidden">
              <img
                src={`https://village-backend-q6jx.onrender.com/${image.image_path}`}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mb-4">
                  {image.category}
                </span>
                <p className="text-xs text-gray-500 mb-4">
                  By: {image.uploaded_by_name} | {new Date(image.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/edit-image/${image.id}`}
                    className="flex-1 btn-primary text-center py-1 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(image.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Delete Confirmation */}
              {deleteConfirm === image.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
                    <p className="mb-4 font-semibold">Are you sure you want to delete this image?</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDelete(image.id)}
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
          <p className="text-gray-600 text-lg">No images yet</p>
          <Link to="/admin/add-image" className="btn-primary mt-4 inline-block">Add Your First Image</Link>
        </div>
      )}
    </div>
  );
};

export default ManageImages;
