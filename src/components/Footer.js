// ============================================================
// FOOTER COMPONENT
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-responsive mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">🌾 Ramachandrunipeta</h3>
            <p className="text-gray-400">
              A vibrant agricultural village in Jaggaiahpeta Mandal, NTR District, Andhra Pradesh.
              Celebrating our heritage, culture, and agricultural excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link to="/agriculture" className="hover:text-white transition">Agriculture</Link></li>
              <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 Email: info@ramachandrunipeta.com</li>
              <li>📍 Location: Ramachandrunipeta</li>
              <li>📱 Jaggaiahpeta Mandal</li>
              <li>🏛️ NTR District, Andhra Pradesh</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-orange-500 transition">📘</a>
              <a href="#" className="text-2xl hover:text-orange-500 transition">🐦</a>
              <a href="#" className="text-2xl hover:text-orange-500 transition">📸</a>
              <a href="#" className="text-2xl hover:text-orange-500 transition">▶️</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} Ramachandrunipeta Village. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with ❤️ for our community</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
