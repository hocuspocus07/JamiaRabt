import { useState } from 'react';
import NavBar from './NavBar';
import Sorting from './Sorting';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';

const AlumniDirectory = () => {
  const navigate = useNavigate();

  const [alumni] = useState([
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
    {
      id: 2,
      name: "Cait Genevieve",
      email: "cait@example.com",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      company: "Google",
      userId: "20010511",
      course: "Information Technology",
      graduationYear: 2019,
      profession: "Product Manager",
      location: "New York, NY",
      joinDate: "May 15, 2023",
      tags: ["Management", "Tech"]
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const handleSearch = (term) => {
    setSearchTerm(term);
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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Column - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:w-1/4 border-2 border-white rounded-lg p-4 bg-gray-800 h-fit">
            <Sorting 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filters={filters}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Alumni Directory</h1>
                  <p className="text-gray-400">
                    Search and connect with verified alumni from Jamia Millia Islamia
                  </p>
                </div>
                {/* Mobile filter toggle button */}
                <button 
                  className="lg:hidden mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {/* Mobile Filters (conditionally shown) */}
              {showMobileFilters && (
                <div className="lg:hidden mb-6 border-2 border-white rounded-lg p-4 bg-gray-800">
                  <Sorting 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onResetFilters={resetFilters}
                    filters={filters}
                  />
                </div>
              )}

              {/* Alumni Profile Cards Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sortedAlumni.map((alumnus) => (
  <div 
    key={alumnus.id} 
    onClick={() => navigate(`/user/${alumnus.userId}`)}
    className="cursor-pointer"
  >
    <ProfileCard 
      name={alumnus.name}
      avatar={alumnus.avatar}
      location={alumnus.location}
      profession={alumnus.profession}
      company={alumnus.company}
      course={alumnus.course}
      graduationYear={alumnus.graduationYear}
      joinDate={alumnus.joinDate}
      tags={alumnus.tags}
    />
  </div>
                ))}
              </div>

              {sortedAlumni.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  No alumni found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;