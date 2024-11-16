import React from "react";

const SenderMessageBox: React.FC<{ message: string; timestamp: string }> = ({
  message,
  timestamp,
}) => {
  return (
    <div className="flex items-start mb-2 justify-end">
      {/* Message Box */}
      <div className="bg-gradient-to-r from-violet-500 to-blue-600 text-white px-6 py-2 rounded-2xl shadow-lg max-w-xs transition-transform transform hover:scale-105">
        {message}
      </div>

      {/* Timestamp (Optional) */}
      <div className="text-xs text-gray-300 ml-2">{timestamp}</div>
    </div>
  );
};

export default SenderMessageBox;
