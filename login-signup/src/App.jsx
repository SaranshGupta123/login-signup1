import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import WelcomePage from './components/WelcomePage';
import MessageModal from './components/MessageModal';
import './App.css'; // Assuming you have a CSS file for global styles

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isLoggedIn) {
      setCurrentPage('welcome');
    } else {
      setCurrentPage('login');
    }
  }, [isLoggedIn]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setLoggedInUserEmail(email);
    setCurrentPage('welcome');
    showMessage('Login successful!', 'success');
  };

  const handleSignupSuccess = () => {
    setCurrentPage('login');
    showMessage('Signup successful! Please log in.', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUserEmail('');
    setCurrentPage('login');
    showMessage('Logged out successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 font-inter">
      {message.text && (
        <MessageModal text={message.text} type={message.type} />
      )}

      {isLoggedIn ? (
        <WelcomePage userEmail={loggedInUserEmail} onLogout={handleLogout} />
      ) : (
        <AuthPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
          onSignupSuccess={handleSignupSuccess}
          showMessage={showMessage}
        />
      )}
    </div>
  );
};

export default App;
