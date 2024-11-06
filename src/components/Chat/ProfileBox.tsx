import React from "react";

interface ProfileBoxProps {
  isSelected?: boolean; // New prop to determine if this box is selected
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ isSelected }) => {
  return (
    <div
      className={`profile-container flex items-center p-2 bg-white rounded-lg shadow-sm transition-transform cursor-pointer w-full 
        ${isSelected ? "transform scale-105 bg-slate-300" : "hover:scale-105"}
      `}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src="https://avatars.githubusercontent.com/u/108149371?v=4"
          alt="Profile"
          className="w-8 h-8 rounded-full" // Adjusted size to fit well
        />
      </div>

      {/* Name and Last Message */}
      <div className="flex-grow px-2">
        <div className="name font-semibold text-gray-800 text-sm">User Name</div>
        <div className="last-message text-gray-500 text-xs truncate">
          Last message preview here...
        </div>
      </div>

      {/* Date and Unread Messages */}
      <div className="right-side flex flex-col items-end">
        <div className="date text-xs text-gray-400">10:45 AM</div>
        <div className="unread-messages bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          3
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
