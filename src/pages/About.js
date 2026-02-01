// ============================================================
// ABOUT PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';

const About = () => {
  const [villageInfo, setVillageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVillageInfo();
  }, []);

  const fetchVillageInfo = async () => {
    try {
      const response = await contentAPI.getVillageInfo();
      setVillageInfo(response.data.villageInfo);
    } catch (err) {
      setError('Failed to load village information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🌾 About Ramachandrunipeta</h1>
          <p className="text-lg md:text-xl text-green-100">
            Discover the heart and soul of our beautiful village
          </p>
        </div>
      </div>

      {/* Village Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {error && <div className="alert-error mb-4">{error}</div>}

          {/* Main Info Card */}
          <div className="card p-8 mb-8 shadow-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Welcome to Our Village</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {villageInfo?.description || 
              'Ramachandrunipeta is a thriving agricultural community in the heart of Andhra Pradesh. Our village is known for its fertile lands, rich cultural heritage, and hardworking farmers who sustain the agricultural backbone of our region.'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">📍 Location</h3>
                <p className="text-sm text-gray-700">{villageInfo?.mandal} Mandal</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">🏛️ District</h3>
                <p className="text-sm text-gray-700">{villageInfo?.district} District</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">🗺️ State</h3>
                <p className="text-sm text-gray-700">{villageInfo?.state}</p>
              </div>
              {villageInfo?.population && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-700 mb-2">👥 Population</h3>
                  <p className="text-sm text-gray-700">{villageInfo.population.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">📚 Our Heritage</h2>
            <p className="text-gray-700 mb-4">
              Ramachandrunipeta has a long and rich history deeply rooted in agriculture and cultural traditions. 
              For generations, our farmers have cultivated the land with dedication and care, passing down traditional 
              farming practices to each new generation.
            </p>
            <p className="text-gray-700">
              The village is a testament to the importance of community, hard work, and cultural pride. 
              Our festivals and celebrations bring the entire community together, strengthening bonds and preserving 
              our unique cultural identity.
            </p>
          </div>

          {/* Agriculture Section */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🌾 Agriculture</h2>
            <p className="text-gray-700 mb-4">
              Agriculture is the lifeblood of our village. Our farmers cultivate a variety of crops including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Rice</strong> - Our primary crop, benefiting from favorable monsoon patterns</li>
              <li><strong>Sugarcane</strong> - An important cash crop supporting local industries</li>
              <li><strong>Vegetables</strong> - Fresh produce for local and regional markets</li>
              <li><strong>Pulses & Grains</strong> - Essential food crops for nutrition</li>
            </ul>
            <p className="text-gray-700">
              We are committed to sustainable farming practices that protect our environment while maintaining productivity 
              for future generations.
            </p>
          </div>

          {/* Culture Section */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Culture & Traditions</h2>
            <p className="text-gray-700 mb-4">
              Our village celebrates vibrant cultural traditions throughout the year:
            </p>
            <div className="grid grid-responsive">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-700 mb-2">🪔 Diwali</h3>
                <p className="text-sm text-gray-700">Festival of lights celebrated with great enthusiasm</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-700 mb-2">🌾 Pongal</h3>
                <p className="text-sm text-gray-700">Harvest festival bringing thanksgiving and joy</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-700 mb-2">🎊 Holi</h3>
                <p className="text-sm text-gray-700">Festival of colors celebrating unity and harmony</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-700 mb-2">🏛️ Local Festivities</h3>
                <p className="text-sm text-gray-700">Temple festivals and community celebrations</p>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="card p-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h2 className="text-2xl font-bold text-green-700 mb-4">💚 Our Community</h2>
            <p className="text-gray-700 mb-4">
              The strength of Ramachandrunipeta lies in its people. We are a close-knit community bound by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Shared Values</strong> - Honesty, hard work, and respect</li>
              <li><strong>Mutual Support</strong> - Helping each other in times of need</li>
              <li><strong>Cultural Pride</strong> - Celebrating our traditions and heritage</li>
              <li><strong>Environmental Care</strong> - Protecting our natural resources</li>
              <li><strong>Community Development</strong> - Working together for progress</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-green-700 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="mb-6">Have questions? We'd love to hear from you!</p>
          {villageInfo?.contact_email && (
            <p className="text-lg">
              📧 <a href={`mailto:${villageInfo.contact_email}`} className="hover:text-green-200 underline">
                {villageInfo.contact_email}
              </a>
            </p>
          )}
          {villageInfo?.contact_phone && (
            <p className="text-lg">
              📱 <a href={`tel:${villageInfo.contact_phone}`} className="hover:text-green-200 underline">
                {villageInfo.contact_phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
