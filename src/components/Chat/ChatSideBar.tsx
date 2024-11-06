import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProfileBox from './ProfileBox';

const ChatSideBar = () => {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState<number | null>(null);

  const handleProfileClick = (index: number) => {
    setSelectedProfileIndex(index);
  };

  return (
    <div className="border h-full w-72 flex flex-col bg-gray-100">

      <div className="p-4">
        <SearchBar />
      </div>


      <div className="flex-grow overflow-y-auto p-2 space-y-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} onClick={() => handleProfileClick(index)}>
            <ProfileBox isSelected={selectedProfileIndex === index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
