import React from "react";

const SearchBar = ({ stateInput, handleOnChange, onKeyPress, handleIcon }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={stateInput}
        onChange={handleOnChange}
        onKeyPress={onKeyPress}
        placeholder="Search"
      />
      <button
        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        onClick={handleIcon}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
