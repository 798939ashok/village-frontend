// ============================================================
// EVENTS PAGE
// ============================================================

import React, { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const [eventsRes, festivalsRes, announcementsRes] = await Promise.all([
        contentAPI.getContentByType('event'),
        contentAPI.getContentByType('festival'),
        contentAPI.getContentByType('announcement')
      ]);
      setEvents(eventsRes.data.content);
      setFestivals(festivalsRes.data.content);
      setAnnouncements(announcementsRes.data.content);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    let content = [];
    let emoji = '📅';

    if (activeTab === 'events') {
      content = events;
      emoji = '📅';
    } else if (activeTab === 'festivals') {
      content = festivals;
      emoji = '🎉';
    } else {
      content = announcements;
      emoji = '📢';
    }

    return (
      <>
        <h2 className="text-3xl font-bold text-green-700 mb-8">{emoji} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        {content.length > 0 ? (
          <div className="space-y-6">
            {content.map(item => (
              <div key={item.id} className="card p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-green-700 mb-2">{item.title}</h3>
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
          <div className="bg-orange-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 text-lg">No {activeTab} available yet.</p>
          </div>
        )}
      </>
    );
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Events & Celebrations</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Stay updated with our latest events, festivals, and announcements
        </p>

        {error && <div className="alert-error mb-4">{error}</div>}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'events'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            📅 Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('festivals')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'festivals'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            🎉 Festivals ({festivals.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'announcements'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            📢 Announcements ({announcements.length})
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Events;
