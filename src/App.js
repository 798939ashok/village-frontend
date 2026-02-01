// ============================================================
// MAIN APP COMPONENT - ROUTING
// ============================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import Agriculture from './pages/Agriculture';
import Events from './pages/Events';
import About from './pages/About';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ManageImages from './pages/ManageImages';
import AddEditImage from './pages/AddEditImage';
import ManageContent from './pages/ManageContent';
import AddEditContent from './pages/AddEditContent';

// Styles
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />

            {/* User Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/images"
              element={
                <ProtectedRoute adminOnly>
                  <ManageImages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-image"
              element={
                <ProtectedRoute adminOnly>
                  <AddEditImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-image/:id"
              element={
                <ProtectedRoute adminOnly>
                  <AddEditImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute adminOnly>
                  <ManageContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-content"
              element={
                <ProtectedRoute adminOnly>
                  <AddEditContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-content/:id"
              element={
                <ProtectedRoute adminOnly>
                  <AddEditContent />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
