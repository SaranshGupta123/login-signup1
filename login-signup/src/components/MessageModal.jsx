import React from 'react';

const MessageModal = ({ text, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = 'text-white'; 

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${bgColor} ${textColor} transition-all duration-300 ease-out transform animate-slide-down`}>
      {text}
    </div>
  );
};

export default MessageModal;
