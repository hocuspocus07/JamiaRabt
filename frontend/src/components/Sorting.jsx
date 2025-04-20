
import React, { useState } from 'react';

function Sorting({ 
  onSearch, 
  onFilterChange, 
  onResetFilters, 
  filters,
  sortConfig,
  onSort
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value); // Let the parent handle debouncing
  };

  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      direction = "descending";
    }
    onSort(key, direction);
  };

  return (
    <>
      <h1 className='text-2xl p-3 font-extrabold'>Apply filters</h1>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search alumni..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 md:py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={localSearchTerm}
          onChange={handleSearchChange}
        />
        <svg
          className="absolute left-3 top-2.5 md:top-3 h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sortConfig?.key || 'name'}
          onChange={(e) => requestSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="graduationYear">Graduation Year</option>
          <option value="profession">Profession</option>
          <option value="course">Course</option>
        </select>
      </div>

      {/* Sort Direction Toggle */}
      <div className="mb-4 flex items-center">
        <span className="text-sm font-medium mr-2">Order:</span>
        <button
          onClick={() => requestSort(sortConfig?.key || 'name')}
          className="text-sm bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1 transition-colors"
        >
          {sortConfig?.direction === 'ascending' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {/* Filter Toggle Button - Mobile */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden mb-4 flex items-center text-sm bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
      >
        <svg 
          className={`w-4 h-4 mr-2 transition-transform ${showFilters ? 'rotate-90' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter Controls - Single Column */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-3 mb-4`}>
        <div>
          <label className="block text-sm font-medium mb-1">Graduation Year</label>
          <input
            type="text"
            placeholder="e.g. 2018"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.graduationYear}
            onChange={(e) => handleFilterChange("graduationYear", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Profession</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.profession}
            onChange={(e) => handleFilterChange("profession", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Course</label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.course}
            onChange={(e) => handleFilterChange("course", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. United States"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        <button
          onClick={onResetFilters}
          className="w-full md:w-auto text-sm bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </>
  );
}

export default Sorting;