// ============================================================
// NAVIGATION BAR COMPONENT
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-green-100 transition">
            🌾 Ramachandrunipeta
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-green-100 transition">Home</Link>
            <Link to="/gallery" className="hover:text-green-100 transition">Gallery</Link>
            <Link to="/agriculture" className="hover:text-green-100 transition">Agriculture</Link>
            <Link to="/events" className="hover:text-green-100 transition">Events</Link>
            <Link to="/about" className="hover:text-green-100 transition">About</Link>

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded transition">
                    Admin Dashboard
                  </Link>
                )}
                <div className="relative group">
                  <button className="hover:text-green-100 transition flex items-center gap-1">
                    👤 {user?.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition z-10">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-100 transition">Login</Link>
                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-600 pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-green-500 rounded">Home</Link>
            <Link to="/gallery" className="block px-4 py-2 hover:bg-green-500 rounded">Gallery</Link>
            <Link to="/agriculture" className="block px-4 py-2 hover:bg-green-500 rounded">Agriculture</Link>
            <Link to="/events" className="block px-4 py-2 hover:bg-green-500 rounded">Events</Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-green-500 rounded">About</Link>

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="block px-4 py-2 hover:bg-green-500 rounded">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-green-500 rounded">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-green-500 rounded">Login</Link>
                <Link to="/signup" className="block px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
