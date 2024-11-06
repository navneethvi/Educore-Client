import React from 'react';

const ReceiverMessageBox: React.FC<{ message: string; timestamp: string }> = ({ message, timestamp }) => {
  return (
    <div className="flex items-start mb-2">
      {/* Profile Picture (Optional) */}
      <div className="flex-shrink-0">
        <img
          src="https://avatars.githubusercontent.com/u/108149371?v=4" // Replace with the actual receiver's profile picture
          alt="Receiver"
          className="w-10 h-10 rounded-full mr-2"
        />
      </div>
      
      {/* Message Box */}
      <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs">
        {message}
      </div>
      
      {/* Timestamp (Optional) */}
      <div className="text-xs text-gray-300 ml-2">{timestamp}</div>
    </div>
  );
};

export default ReceiverMessageBox;
