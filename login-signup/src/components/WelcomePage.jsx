import React from 'react';

const WelcomePage = ({ userEmail, onLogout }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center transform transition-all duration-300 hover:scale-105 relative">
      <button
        onClick={onLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
      >
        Logout
      </button>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in">
        Welcome!
      </h2>
      <p className="text-xl text-gray-700 mb-8 animate-fade-in delay-100">
        You are successfully logged in as <span className="font-semibold text-blue-600">{userEmail}</span>.
      </p>
      <p className="text-lg text-gray-600 animate-fade-in delay-200">
        This is your personalized welcome area.
      </p>
    </div>
  );
};

export default WelcomePage;
