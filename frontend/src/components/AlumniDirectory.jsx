import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Sorting from './Sorting';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import { fetchAlumni } from '../utils/alumni';

const AlumniDirectory = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    profession: '',
    course: '',
    location: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'graduationYear',
    direction: 'descending'
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Single useEffect for all data fetching
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      const loadAlumni = async () => {
        if (!isMounted) return;
        
        setLoading(true);
        try {
          const data = await fetchAlumni(
            { ...filters, searchTerm },
            sortConfig
          );
          if (isMounted) setAlumni(data);
        } catch (err) {
          if (isMounted) setError(err.message || 'Failed to fetch alumni');
        } finally {
          if (isMounted) setLoading(false);
        }
      };
      
      loadAlumni();
    }, 500); // Basic debounce

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchTerm, filters, sortConfig]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      graduationYear: '',
      profession: '',
      course: '',
      location: ''
    });
    setSearchTerm('');
  };

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
        <NavBar />
        <div className="flex-1 p-4 md:p-6 md:ml-64 flex items-center justify-center">
          <div className="text-white">Loading alumni data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
        <NavBar />
        <div className="flex-1 p-4 md:p-6 md:ml-64 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Column */}
          <div className="hidden lg:block lg:w-1/4 border-2 border-white rounded-lg p-4 bg-gray-800 h-fit">
            <Sorting 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filters={filters}
              sortConfig={sortConfig}
              onSort={requestSort}
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
                <button 
                  className="lg:hidden mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {showMobileFilters && (
                <div className="lg:hidden mb-6 border-2 border-white rounded-lg p-4 bg-gray-800">
                  <Sorting 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onResetFilters={resetFilters}
                    filters={filters}
                    sortConfig={sortConfig}
                    onSort={requestSort}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {alumni.map((alumnus) => (
                  <div 
                    key={alumnus._id} 
                    onClick={() => navigate(`/user/${alumnus._id}`)}
                    className="cursor-pointer"
                  >
                    <ProfileCard 
                      name={alumnus.fullName || alumnus.username}
                      avatar={alumnus.avatar}
                      location={alumnus.location}
                      profession={alumnus.profession}
                      company={alumnus.company}
                      course={alumnus.course}
                      graduationYear={alumnus.graduationYear}
                      joinDate={new Date(alumnus.createdAt).toLocaleDateString()}
                      tags={alumnus.skills || []}
                    />
                  </div>
                ))}
              </div>

              {alumni.length === 0 && !loading && (
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