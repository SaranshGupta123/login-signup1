import React, { useState } from 'react';

const AuthPage = ({ currentPage, setCurrentPage, onLoginSuccess, onSignupSuccess, showMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (currentPage === 'signup') {
      if (!email || !password || !confirmPassword) {
        showMessage('Please enter all fields (email, password, and confirm password).', 'error');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        setLoading(false);
        return;
      }
    } else { 
      if (!email || !password) {
        showMessage('Please enter both email and password.', 'error');
        setLoading(false);
        return;
      }
    }

    const API_BASE_URL = 'http://localhost:3001/api';

    try {
      let response;
      if (currentPage === 'login') {
        response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, confirmPassword }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        if (currentPage === 'login') {
          onLoginSuccess(data.email); 
        } else {
          onSignupSuccess(); 
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } else {
        showMessage(data.message || 'An error occurred.', 'error');
      }
    } catch (error) {
      console.error('Network error:', error);
      showMessage('Could not connect to the server. Please try again later.', 'error'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setCurrentPage('login')}
          className={`px-6 py-3 rounded-l-xl text-lg font-semibold transition-all duration-300 ${
            currentPage === 'login'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('signup')}
          className={`px-6 py-3 rounded-r-xl text-lg font-semibold transition-all duration-300 ${
            currentPage === 'signup'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sign Up
        </button>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {currentPage === 'login' ? 'Welcome Back!' : 'Join Us!'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {currentPage === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
          disabled={loading} 
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            currentPage === 'login' ? 'Login' : 'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
