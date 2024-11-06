import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="store-header flex justify-between items-center bg-white rounded-lg shadow-sm ">
      <form
        className="flex items-center max-w-sm w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search-input"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full h-10 focus:ring-blue-500 focus:border-transparent block w-full p-3 shadow-sm placeholder-gray-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
