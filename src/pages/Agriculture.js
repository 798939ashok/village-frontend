// ============================================================
// AGRICULTURE PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';

const Agriculture = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getContentByType('agriculture');
      setContent(response.data.content);
    } catch (err) {
      setError('Failed to load agriculture information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🌾 Agriculture</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Discover the agricultural practices and heritage of Ramachandrunipeta
        </p>

        {error && <div className="alert-error mb-4">{error}</div>}

        {content.length > 0 ? (
          <div className="space-y-8">
            {content.map(item => (
              <div key={item.id} className="card p-6 border-l-4 border-green-700">
                <h2 className="text-2xl font-bold text-green-700 mb-3">{item.title}</h2>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 text-lg">No agriculture information available yet.</p>
            <p className="text-gray-600 mt-2">Please check back soon for updates!</p>
          </div>
        )}

        {/* Default Agriculture Info */}
        {content.length === 0 && (
          <div className="space-y-8">
            <div className="card p-6 border-l-4 border-green-700">
              <h2 className="text-2xl font-bold text-green-700 mb-3">Traditional Farming</h2>
              <p className="text-gray-700">
                Ramachandrunipeta has a rich tradition of agriculture with farmers practicing 
                sustainable and organic farming methods passed down through generations.
              </p>
            </div>

            <div className="card p-6 border-l-4 border-green-700">
              <h2 className="text-2xl font-bold text-green-700 mb-3">Main Crops</h2>
              <p className="text-gray-700">
                Our village predominantly grows rice, sugarcane, and various vegetables, 
                taking advantage of the fertile soil and favorable climate.
              </p>
            </div>

            <div className="card p-6 border-l-4 border-green-700">
              <h2 className="text-2xl font-bold text-green-700 mb-3">Sustainability</h2>
              <p className="text-gray-700">
                We are committed to sustainable agricultural practices that preserve our 
                environment for future generations while maintaining productivity.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agriculture;
