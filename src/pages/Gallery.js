// ============================================================
// GALLERY PAGE - DISPLAY ALL VILLAGE IMAGES
// ============================================================

import React, { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['all', 'agriculture', 'cultural', 'events', 'general'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await contentAPI.getImages();
      setImages(response.data.images);
      setFilteredImages(response.data.images);
    } catch (err) {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-4">📸 Village Gallery</h1>
      <p className="text-gray-600 mb-8">Browse beautiful images from our village</p>

      {error && <div className="alert-error mb-4">{error}</div>}

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryFilter(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-responsive">
          {filteredImages.map(image => (
            <div key={image.id} className="card overflow-hidden hover:shadow-xl transition">
              <img
                src={`https://village-backend-q6jx.onrender.com/${image.image_path}`}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-green-700">{image.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No images found in this category</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
