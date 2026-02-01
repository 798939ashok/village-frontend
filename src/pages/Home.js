// ============================================================
// HOME PAGE - LANDING PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../utils/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentAPI.getDashboardStats();
        setStats(response.data);
        setAnnouncements(response.data.latestAnnouncements);
      } catch (err) {
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🌾 Welcome to Ramachandrunipeta</h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">
            A Thriving Agricultural Village in NTR District, Andhra Pradesh
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/gallery" className="btn-secondary">View Gallery</Link>
            <Link to="/agriculture" className="btn-outline">Learn About Agriculture</Link>
          </div>
        </div>
      </div>

      {/* Village Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-green-700">About Our Village</h2>
          <p className="text-gray-700 text-lg mb-4">
            Ramachandrunipeta is a beautiful agricultural village located in Jaggaiahpeta Mandal, 
            NTR District, Andhra Pradesh. Our village is known for its fertile lands, traditional farming 
            practices, and vibrant cultural heritage. We take pride in our agricultural produce and the 
            tight-knit community that celebrates festivals and cultural events throughout the year.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-700">{stats?.totalUsers || 0}</h3>
              <p className="text-gray-600">Registered Users</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-700">{stats?.images?.[0]?.count || 0}</h3>
              <p className="text-gray-600">Images</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-700">{stats?.content?.[0]?.count || 0}</h3>
              <p className="text-gray-600">Events</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-700">100%</h3>
              <p className="text-gray-600">Community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-lg my-8">
          <h2 className="text-3xl font-bold mb-8 text-green-700">📢 Latest Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded">
                <h3 className="font-bold text-lg text-gray-800">{announcement.title}</h3>
                <p className="text-gray-600 mt-1">{announcement.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <Link to="/events" className="btn-primary mt-6 inline-block">View All Events</Link>
        </div>
      )}

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">What We Offer</h2>
        <div className="grid grid-responsive">
          <div className="card p-6 text-center hover:shadow-xl">
            <div className="text-4xl mb-4">🌾</div>
            <h3 className="text-xl font-bold mb-2 text-green-700">Agriculture</h3>
            <p className="text-gray-600">Learn about our farming practices and agricultural heritage.</p>
            <Link to="/agriculture" className="text-green-700 hover:text-green-900 font-semibold mt-4 inline-block">Read More →</Link>
          </div>

          <div className="card p-6 text-center hover:shadow-xl">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2 text-green-700">Cultural Events</h3>
            <p className="text-gray-600">Discover our festivals, celebrations, and community gatherings.</p>
            <Link to="/events" className="text-green-700 hover:text-green-900 font-semibold mt-4 inline-block">Read More →</Link>
          </div>

          <div className="card p-6 text-center hover:shadow-xl">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2 text-green-700">Photo Gallery</h3>
            <p className="text-gray-600">Browse beautiful images of our village, nature, and people.</p>
            <Link to="/gallery" className="text-green-700 hover:text-green-900 font-semibold mt-4 inline-block">View Gallery →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
