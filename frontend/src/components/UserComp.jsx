import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth.js';

function UserComp() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
          navigate('/signup');
        }
      }, [navigate]);
      
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [newExperience, setNewExperience] = useState({
        company: '',
        position: '',
        duration: '',
        description: ''
    });
    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/signup');
                return;
            }
    
            try {
                console.log("Fetching user data with token:", token);
                const currentUser = await getCurrentUser(token);
                console.log("Received user data:", currentUser);
                setUserData(currentUser);
            } catch (err) {
                console.error("Error fetching user:", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    navigate('/signup');
                }
                setError(err.response?.data?.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [navigate]);
      

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAchievementChange = (e) => {
        const { name, value } = e.target;
        setNewAchievement(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setNewExperience(prev => ({
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
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
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
    

    const handleAddAchievement = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(
                'https://jamiarabt.onrender.com/api/v1/users/update-account',
                {
                    achievements: [...userData.achievements, {
                        title: newAchievement.title,
                        description: newAchievement.description,
                        date: newAchievement.date || new Date()
                    }]
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            setUserData(response.data.data);
            setNewAchievement({ title: '', description: '', date: '' });
            setShowAchievementForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add achievement');
        } finally {
            setLoading(false);
        }
    };
    

    const handleAddExperience = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(
                'https://jamiarabt.onrender.com/api/v1/users/update-account',
                {
                    experience: [
                        ...(userData.experience || []),
                        {
                            company: newExperience.company,
                            position: newExperience.position,
                            duration: newExperience.duration,
                            description: newExperience.description
                        }
                    ]
                    
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            setUserData(response.data.data);
            setNewExperience({ company: '', position: '', duration: '', description: '' });
            setShowExperienceForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add experience');
        } finally {
            setLoading(false);
        }
    };
    

    // Format activities from user data
    const activities = [
        ...(userData?.updatedAt ? [
            { 
                id: 1, 
                type: "Update", 
                description: "Updated profile information", 
                date: new Date(userData.updatedAt).toLocaleDateString(),
                icon: "🔄"
            }
        ] : []),
        
        // Achievements
        ...(userData?.achievements?.map((achievement, index) => ({
            id: `achievement-${index}`,
            type: "Achievement",
            description: achievement.title,
            content: achievement.description,
            date: new Date(achievement.date).toLocaleDateString(),
            icon: "🏆"
        })) || []),
        
        // Experiences
        ...(userData?.experience?.map((exp, index) => ({
            id: `experience-${index}`,
            type: "Experience",
            description: `Added ${exp.position} at ${exp.company}`,
            content: exp.description,
            date: new Date().toLocaleDateString(), // You might want to add date to experience model
            icon: "💼"
        })) || [])
    ];

    // Format experience from user data
    const experience = userData?.experience?.map((exp, index) => ({
        id: index + 1,
        company: exp.company || "Unknown Company",
        position: exp.position || "Unknown Position",
        duration: exp.duration || "No duration specified",
        description: exp.description || "No description provided"
    })) || [];

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

    return (
        <div className='flex flex-col md:flex-row'>
            <NavBar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            
            <div className="flex-1 sm:ml-60 bg-gray-900 min-h-screen text-white">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between h-16 px-4 border-b border-gray-700">
                    <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600">
        {userData?.avatar ? (
            <img src={userData.avatar} alt="user profile" className="h-full w-full object-cover" />
        ) : (
            <div className="h-full w-full flex items-center justify-center text-xl">
                {userData?.fullName?.charAt(0).toUpperCase() || '?'}
            </div>
        )}
    </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col space-y-4">
                        <div className="text-white">
                        <h1 className="text-2xl sm:text-3xl font-semibold">
        Welcome, {userData?.fullName?.split(' ')[0] || 'User'}!
    </h1>                            <p className="text-gray-400 text-sm sm:text-base">
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

                        {activeTab === 'activity' && (
                            <div>
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold">Your Activity</h2>
                                    <button 
                                        onClick={() => setShowAchievementForm(true)}
                                        className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                                    >
                                        Add Achievement
                                    </button>
                                </div>

                                {showAchievementForm && (
                                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                                        <h3 className="text-lg font-medium mb-3">Add New Achievement</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={newAchievement.title}
                                                    onChange={handleAchievementChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={newAchievement.description}
                                                    onChange={handleAchievementChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                    rows="3"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Date</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={newAchievement.date}
                                                    onChange={handleAchievementChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleAddAchievement}
                                                    disabled={loading}
                                                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setShowAchievementForm(false)}
                                                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {activities.length > 0 ? (
                                        activities.map(activity => (
                                            <div key={activity.id} className="bg-gray-700 rounded-lg p-4 flex items-start hover:bg-gray-600 transition-colors">
                                                <span className="text-xl mr-3 flex-shrink-0">{activity.icon}</span>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium text-white">{activity.type}</h3>
                                                            <p className="text-gray-300">{activity.description}</p>
                                                            {activity.content && (
                                                                <p className="text-gray-400 mt-1 italic">"{activity.content}"</p>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                            {activity.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-gray-700 rounded-lg p-8 text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="mt-2 text-gray-400">No activities yet</p>
                                            <p className="text-xs text-gray-500 mt-1">Add achievements to see them here</p>
                                        </div>
                                    )}
                                </div>
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
                                    <button 
                                        onClick={() => setShowExperienceForm(true)}
                                        className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                                    >
                                        Add Experience
                                    </button>
                                </div>

                                {showExperienceForm && (
                                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                                        <h3 className="text-lg font-medium mb-3">Add New Experience</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Company</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={newExperience.company}
                                                    onChange={handleExperienceChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Position</label>
                                                <input
                                                    type="text"
                                                    name="position"
                                                    value={newExperience.position}
                                                    onChange={handleExperienceChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300">Duration</label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    value={newExperience.duration}
                                                    onChange={handleExperienceChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                    placeholder="e.g. Jan 2020 - Present"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={newExperience.description}
                                                    onChange={handleExperienceChange}
                                                    className="mt-1 block w-full text-sm border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-600 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                    rows="3"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 flex space-x-2">
                                                <button
                                                    onClick={handleAddExperience}
                                                    disabled={loading}
                                                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setShowExperienceForm(false)}
                                                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 sm:space-y-6">
                                    {experience.length > 0 ? (
                                        experience.map(exp => (
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
                                                            <h4 className="text-xs sm:text-sm font-medium text-gray-400">Description</h4>
                                                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300">
                                                                {exp.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-gray-700 rounded-lg p-8 text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="mt-2 text-gray-400">No experience added yet</p>
                                            <p className="text-xs text-gray-500 mt-1">Add your professional experiences to showcase them here</p>
                                        </div>
                                    )}
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