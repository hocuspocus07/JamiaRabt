import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAlumniProfile } from '../utils/alumni.js';

const AlumniProfile = () => {
  const { id } = useParams();
  const [alumnus, setAlumnus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchAlumniProfile(id);
        setAlumnus(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-white text-center py-10">Error: {error}</div>;
  if (!alumnus) return <div className="text-white text-center py-10">Alumnus not found</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{alumnus.fullName || alumnus.username}</h1>
            <p className="text-gray-400">
              {alumnus.profession} {alumnus.company ? `at ${alumnus.company}` : ''}
            </p>
          </div>
          <a 
            href="/alumni" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Back to Directory
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
              <div className="flex justify-center mb-6">
                <img 
                  src={alumnus.avatar || 'https://via.placeholder.com/150'} 
                  alt={alumnus.fullName}
                  className="h-40 w-40 rounded-full border-4 border-gray-700"
                />
              </div>
              
              <div className="space-y-4">
                {alumnus.email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Contact</h3>
                    <p className="mt-1">{alumnus.email}</p>
                  </div>
                )}
                
                {alumnus.location && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Location</h3>
                    <p className="mt-1">{alumnus.location}</p>
                  </div>
                )}
                
                {alumnus.course && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Education</h3>
                    <p className="mt-1">
                      {alumnus.course} {alumnus.graduationYear ? `(${alumnus.graduationYear})` : ''}
                    </p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full mt-2 py-2 px-4 border border-gray-600 hover:bg-gray-700 rounded-lg">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {alumnus.bio && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-300">
                  {alumnus.bio}
                </p>
              </div>
            )}
            
            {(alumnus.profession || alumnus.company) && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Experience</h2>
                <div className="space-y-4">
                  <div>
                    {alumnus.company && <h3 className="font-medium">{alumnus.company}</h3>}
                    {alumnus.profession && <p className="text-gray-400">{alumnus.profession}</p>}
                    <p className="text-gray-500 text-sm">Current</p>
                  </div>
                </div>
              </div>
            )}
            
            {alumnus.skills?.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Skills & Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {alumnus.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;