import React from 'react';

const SenderMessageBox: React.FC<{ message: string; timestamp: string }> = ({ message, timestamp }) => {
  return (
    <div className="flex items-start mb-2 justify-end">
      {/* Message Box */}
      <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md max-w-xs">
        {message}
      </div>
      
      {/* Timestamp (Optional) */}
      <div className="text-xs text-gray-300 ml-2">{timestamp}</div>
    </div>
  );
};

export default SenderMessageBox;
