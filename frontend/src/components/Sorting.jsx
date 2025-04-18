import React,{useState} from 'react'

function Sorting() {
    const [alumni, setAlumni] = useState([
        {
          id: 1,
          name: "Floyd Miles",
          email: "floydmiles@pagedone.io",
          avatar: "https://pagedone.io/asset/uploads/1697536419.png",
          company: "Louis Vuitton",
          userId: "20010510",
          course: "Computer Science",
          graduationYear: 2018,
          profession: "Software Engineer",
          location: "United States",
          joinDate: "Jun. 24, 2023",
          tags: ["Tech", "Engineering"]
        },
      ]);
    
      const [searchTerm, setSearchTerm] = useState("");
      const [filters, setFilters] = useState({
        graduationYear: "",
        profession: "",
        course: "",
        location: "",
      });
    
      const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending"
      });
    
      const [showFilters, setShowFilters] = useState(false);
    
      const filteredAlumni = alumni.filter(alumnus => {
        const matchesSearch = 
          alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumnus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumnus.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumnus.profession.toLowerCase().includes(searchTerm.toLowerCase());
    
        const matchesFilters = Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          return alumnus[key]?.toString().toLowerCase() === value.toLowerCase();
        });
    
        return matchesSearch && matchesFilters;
      });
    
      const sortedAlumni = [...filteredAlumni].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    
      const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
          direction = "descending";
        }
        setSortConfig({ key, direction });
      };
    
      const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
      };
    
      const resetFilters = () => {
        setFilters({
          graduationYear: "",
          profession: "",
          course: "",
          location: "",
        });
        setSearchTerm("");
      };
  return (
    <>
        <h1 className='text-2xl p-3 font-extrabold'>Apply filters</h1>
    <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search alumni..."
      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 md:py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
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
      <select
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filters.graduationYear}
        onChange={(e) => handleFilterChange("graduationYear", e.target.value)}
      >
        <option value="">All Years</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Profession</label>
      <select
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filters.profession}
        onChange={(e) => handleFilterChange("profession", e.target.value)}
      >
        <option value="">All Professions</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Data Scientist">Data Scientist</option>
        <option value="Product Manager">Product Manager</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Course</label>
      <select
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filters.course}
        onChange={(e) => handleFilterChange("course", e.target.value)}
      >
        <option value="">All Courses</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Business Administration">Business Administration</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Location</label>
      <select
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filters.location}
        onChange={(e) => handleFilterChange("location", e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="United States">United States</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="Germany">Germany</option>
      </select>
    </div>

    <button
      onClick={resetFilters}
      className="w-full md:w-auto text-sm bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors"
    >
      Reset Filters
    </button>
  </div>
</>
  )
}

export default Sorting;