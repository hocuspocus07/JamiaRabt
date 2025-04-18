import { useState } from 'react';
import NavBar from './NavBar';
import Sorting from './Sorting';

const AlumniDirectory = () => {
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
    // Add more alumni data as needed
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
      
      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Column - Shows first on mobile, left on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2 border-2 min-h-screen px-10 border-white">
            <Sorting 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filters={filters}
            />
          </div>
          
          {/* Table Column - Takes remaining space */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Alumni Directory</h1>
                <p className="text-gray-400 mb-4">
                  Search and connect with verified alumni from Jamia Millia Islamia.
                </p>
              </div>

              {/* Alumni Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  {/* Table Headers */}
                  <thead className="bg-gray-800">
                    <tr>
                      <th 
                        className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          <span className="hidden md:inline">Name</span>
                          <span className="md:hidden">Alumni</span>
                          {sortConfig.key === "name" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      {/* Other table headers... */}
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {sortedAlumni.map((alumnus) => (
                      <tr key={alumnus.id} className="hover:bg-gray-750 transition-colors">
                        {/* Table cells... */}
                      </tr>
                    ))}
                  </tbody>
                </table>
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