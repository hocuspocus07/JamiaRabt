import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth.js';

function UserComp() {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getCurrentUser();
            setUserData(response.data.data);
          } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user data');
            if (err.response?.status === 401) {
              navigate('/signup');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [navigate]);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(
                'https://jamiarabt.onrender.com/api/v1/users/update-account',
                {
                    fullName: userData.fullName,
                    email: userData.email,
                    profession: userData.profession,
                    company: userData.company,
                    location: userData.location,
                    linkedInUrl: userData.linkedInUrl,
                    skills: userData.skills
                },
                { withCredentials: true }
            );
            setIsEditing(false);
            setUserData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
            console.error('Error updating user data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row">
                <NavBar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <div className="flex-1 sm:ml-60 bg-gray-900 min-h-screen text-white flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col md:flex-row">
                <NavBar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <div className="flex-1 sm:ml-60 bg-gray-900 min-h-screen text-white flex items-center justify-center">
                    <div className="text-center p-4">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex flex-col md:flex-row">
                <NavBar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <div className="flex-1 sm:ml-60 bg-gray-900 min-h-screen text-white flex items-center justify-center">
                    <p>No user data available</p>
                </div>
            </div>
        );
    }

    // Format activities from user data (you might need to adjust based on your actual data structure)
    const activities = [
        { id: 1, type: "Update", description: "Updated profile information", date: new Date(userData.updatedAt).toLocaleDateString() },
        ...(userData.achievements.length > 0 ? [
            { id: 2, type: "Achievement", description: `Added achievement: ${userData.achievements[0].title}`, date: "Recently" }
        ] : [])
    ];

    // Format experience from user data
    const experience = userData.experience.map((exp, index) => ({
        id: index + 1,
        company: exp.company || "Unknown Company",
        position: exp.position || "Unknown Position",
        duration: exp.duration || "No duration specified"
    }));

    return (
        <div className='flex flex-col md:flex-row'>
            <NavBar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            
            <div className="flex-1 sm:ml-60 bg-gray-900 min-h-screen text-white">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between h-16 px-4 border-b border-gray-700">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600">
                            {userData.avatar ? (
                                <img src={userData.avatar} alt="user profile" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-xl">
                                    {userData.fullName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col space-y-4">
                        <div className="text-white">
                            <h1 className="text-2xl sm:text-3xl font-semibold">Welcome, {userData.fullName.split(' ')[0]}!</h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                {userData.profession || "Alumni"} {userData.company ? `at ${userData.company}` : ""}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-700 overflow-x-auto">
                        <nav className="flex space-x-4 min-w-max">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Personal
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Activity
                            </button>
                            <button
                                onClick={() => setActiveTab('education')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'education' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Education
                            </button>
                            <button
                                onClick={() => setActiveTab('experience')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Experience
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                        {activeTab === 'personal' && (
                            <div>
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold">Personal Information</h2>
                                    {!isEditing ? (
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="space-x-2">
                                            <button 
                                                onClick={handleSave}
                                                disabled={loading}
                                                className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                            <button 
                                                onClick={() => setIsEditing(false)}
                                                className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {[
                                            { id: "fullName", label: "Full Name", type: "text", value: userData.fullName },
                                            { id: "email", label: "Email", type: "email", value: userData.email },
                                            { id: "profession", label: "Profession", type: "text", value: userData.profession || '' },
                                            { id: "company", label: "Company", type: "text", value: userData.company || '' },
                                            { id: "location", label: "Location", type: "text", value: userData.location || '' },
                                            { id: "linkedInUrl", label: "LinkedIn", type: "text", value: userData.linkedInUrl || '' },
                                            { id: "skills", label: "Skills (comma separated)", type: "text", value: userData.skills.join(', ') }
                                        ].map(field => (
                                            <div key={field.id} className={field.id === 'skills' ? 'sm:col-span-2' : ''}>
                                                <label htmlFor={field.id} className="block text-xs sm:text-sm font-medium text-gray-300">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    name={field.id}
                                                    id={field.id}
                                                    value={field.value}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full text-sm sm:text-base border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {[
                                            { label: "Full Name", value: userData.fullName },
                                            { label: "Email", value: userData.email },
                                            { label: "Username", value: userData.username },
                                            { label: "Profession", value: userData.profession || 'Not specified' },
                                            { label: "Company", value: userData.company || 'Not specified' },
                                            { label: "Location", value: userData.location || 'Not specified' },
                                            { 
                                                label: "LinkedIn", 
                                                value: userData.linkedInUrl ? userData.linkedInUrl.replace(/^https?:\/\//, '') : 'Not specified',
                                                link: userData.linkedInUrl ? (userData.linkedInUrl.startsWith('http') ? userData.linkedInUrl : `https://${userData.linkedInUrl}`) : null
                                            },
                                            { label: "Skills", value: userData.skills.join(', ') }
                                        ].map((field, index) => (
                                            <div key={index}>
                                                <h3 className="text-xs sm:text-sm font-medium text-gray-400">{field.label}</h3>
                                                <p className="mt-1 text-sm sm:text-base text-white">
                                                    {field.link ? (
                                                        <a href={field.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                                                            {field.value}
                                                        </a>
                                                    ) : field.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Education</h2>
                                <div className="bg-gray-700 rounded-lg p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-purple-500 text-white">
                                                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-medium text-white">Jamia Millia Islamia</h3>
                                            <p className="mt-1 text-sm sm:text-base text-gray-300">{userData.course.toUpperCase()}</p>
                                            <p className="mt-1 text-xs sm:text-sm text-gray-400">Graduation Year: {userData.graduationYear}</p>
                                            <div className="mt-3 sm:mt-4">
                                                <h4 className="text-xs sm:text-sm font-medium text-gray-400">Skills</h4>
                                                <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2">
                                                    {userData.skills.map(skill => (
                                                        <span key={skill} className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div>
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold">Professional Experience</h2>
                                    <button className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                                        Add Experience
                                    </button>
                                </div>
                                <div className="space-y-4 sm:space-y-6">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="bg-gray-700 rounded-lg p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                                    <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-500 text-white">
                                                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-medium text-white">{exp.company}</h3>
                                                    <p className="mt-1 text-sm sm:text-base text-gray-300">{exp.position}</p>
                                                    <p className="mt-1 text-xs sm:text-sm text-gray-400">{exp.duration}</p>
                                                    <div className="mt-3 sm:mt-4">
                                                        <h4 className="text-xs sm:text-sm font-medium text-gray-400">Key Responsibilities</h4>
                                                        <ul className="mt-1 sm:mt-2 list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                                                            <li>Developed and maintained web applications using React and Node.js</li>
                                                            <li>Collaborated with cross-functional teams to define and implement features</li>
                                                            <li>Optimized application performance and improved user experience</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserComp;