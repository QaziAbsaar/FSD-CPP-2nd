import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logout, getUser } from '../utils/auth';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const user = getUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-brand-gold">
          Campus Hub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className={`transition-all ${
              isActive('/') 
                ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                : 'text-dark-text hover:text-brand-gold'
            }`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`transition-all ${
              isActive('/courses') 
                ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                : 'text-dark-text hover:text-brand-gold'
            }`}
          >
            Courses
          </Link>

          {isAuthenticated() ? (
            <>
              <Link
                to="/dashboard"
                className={`transition-all ${
                  isActive('/dashboard') 
                    ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                    : 'text-dark-text hover:text-brand-gold'
                }`}
              >
                Dashboard
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`transition-all ${
                    isActive('/admin') 
                      ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                      : 'text-dark-text hover:text-brand-gold'
                  }`}
                >
                  Admin
                </Link>
              )}

              <Link
                to="/profile"
                className={`transition-all ${
                  isActive('/profile') 
                    ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                    : 'text-dark-text hover:text-brand-gold'
                }`}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`transition-all ${
                  isActive('/login') 
                    ? 'bg-brand-gold text-white px-4 py-2 rounded-full' 
                    : 'text-dark-text hover:text-brand-gold'
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-brand-gold text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-0.5 bg-dark-text"></div>
          <div className="w-6 h-0.5 bg-dark-text"></div>
          <div className="w-6 h-0.5 bg-dark-text"></div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t p-4 flex flex-col gap-4">
          <Link to="/" className="text-dark-text hover:text-brand-gold">Home</Link>
          <Link to="/courses" className="text-dark-text hover:text-brand-gold">Courses</Link>
          {isAuthenticated() && (
            <>
              <Link to="/dashboard" className="text-dark-text hover:text-brand-gold">Dashboard</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-dark-text hover:text-brand-gold">Admin</Link>
              )}
              <Link to="/profile" className="text-dark-text hover:text-brand-gold">Profile</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600 text-left">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated() && (
            <>
              <Link to="/login" className="text-dark-text hover:text-brand-gold">Login</Link>
              <Link to="/signup" className="text-dark-text hover:text-brand-gold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
