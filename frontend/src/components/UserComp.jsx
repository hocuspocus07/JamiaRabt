import React, { useState } from 'react';
import NavBar from './NavBar';

function UserComp() {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "Sajjad Hasnain",
        email: "sajjad.hasnain@example.com",
        phone: "+91 555 1234567",
        graduationYear: "2018",
        degree: "Bachelor of Science in Computer Science",
        university: "Jamia Millia Islamia",
        currentJob: "Senior Software Engineer at TechCorp",
        linkedin: "linkedin.com/in/sajjadali",
        github: "github.com/sajjadali",
        bio: "Passionate about technology and education. Currently working on AI research projects."
    });

    const [activities] = useState([
        { id: 1, type: "Connection", description: "Connected with Maria Garcia", date: "2 hours ago" },
        { id: 2, type: "Post", description: "Shared a job opportunity at Google", date: "1 day ago" },
        { id: 3, type: "Event", description: "Registered for Alumni Meet 2023", date: "3 days ago" },
        { id: 4, type: "Update", description: "Updated work experience", date: "1 week ago" },
    ]);

    const [experience] = useState([
        { id: 1, company: "TechCorp", position: "Senior Software Engineer", duration: "2021 - Present" },
        { id: 2, company: "InnovateSoft", position: "Software Engineer", duration: "2018 - 2021" },
        { id: 3, company: "CodeGenius", position: "Intern", duration: "Summer 2017" },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className='flex'>
            <NavBar/>
        <div className="flex bg-gray-900 min-h-screen sm:flex-1 sm:w-0 w-screen text-white">
            <div className="flex-grow text-gray-800">
                <header className="flex items-center h-20 px-6 sm:px-10">
                    <div className="flex flex-shrink-0 items-center ml-auto text-white">
                        <button className="inline-flex items-center p-2 hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-100 rounded-lg">
                            <span className="sr-only">User Menu</span>
                            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                                <span className="font-semibold">{userData.name}</span>
                                <span className="text-sm text-white">Alumni</span>
                            </div>
                            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                                <img src="/profile-pic.png" alt="user profile photo" className="h-full w-full object-cover" />
                            </span>
                        </button>
                    </div>
                </header>
                
                <main className="p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div className="mr-6 text-white">
                            <h1 className="text-4xl font-semibold mb-2">Welcome, {userData.name.split(' ')[0]}!</h1>
                            <p className="text-gray-400">Jamia Millia Islamia University Alumni Portal</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-700">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Personal Details
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Recent Activity
                            </button>
                            <button
                                onClick={() => setActiveTab('education')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'education' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Education
                            </button>
                            <button
                                onClick={() => setActiveTab('experience')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                            >
                                Experience
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-gray-800 rounded-lg shadow p-6">
                        {activeTab === 'personal' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Personal Information</h2>
                                    {!isEditing ? (
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="space-x-2">
                                            <button 
                                                onClick={handleSave}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                            >
                                                Save Changes
                                            </button>
                                            <button 
                                                onClick={() => setIsEditing(false)}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={userData.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={userData.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                value={userData.phone}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">LinkedIn</label>
                                            <input
                                                type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                value={userData.linkedin}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="github" className="block text-sm font-medium text-gray-300">GitHub</label>
                                            <input
                                                type="text"
                                                name="github"
                                                id="github"
                                                value={userData.github}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                                            <textarea
                                                name="bio"
                                                id="bio"
                                                rows="3"
                                                value={userData.bio}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            ></textarea>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                                            <p className="mt-1 text-lg text-white">{userData.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Email</h3>
                                            <p className="mt-1 text-lg text-white">{userData.email}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                                            <p className="mt-1 text-lg text-white">{userData.phone}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Current Position</h3>
                                            <p className="mt-1 text-lg text-white">{userData.currentJob}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">LinkedIn</h3>
                                            <p className="mt-1 text-lg text-white">
                                                <a href={`https://${userData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                                                    {userData.linkedin}
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">GitHub</h3>
                                            <p className="mt-1 text-lg text-white">
                                                <a href={`https://${userData.github}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                                                    {userData.github}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <h3 className="text-sm font-medium text-gray-400">About</h3>
                                            <p className="mt-1 text-white">{userData.bio}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Recent Activity</h2>
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                                        View All Activity
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {activities.map(activity => (
                                        <div key={activity.id} className="p-4 bg-gray-700 rounded-lg">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    {activity.type === "Connection" && (
                                                        <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                    )}
                                                    {activity.type === "Post" && (
                                                        <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                    )}
                                                    {activity.type === "Event" && (
                                                        <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                    {activity.type === "Update" && (
                                                        <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-white">{activity.description}</p>
                                                    <p className="text-sm text-gray-400">{activity.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Education</h2>
                                <div className="bg-gray-700 rounded-lg p-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-white">{userData.university}</h3>
                                            <p className="mt-1 text-gray-300">{userData.degree}</p>
                                            <p className="mt-1 text-gray-400">Graduated: {userData.graduationYear}</p>
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-400">Courses Completed</h4>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                                                        Data Structures
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                                                        Algorithms
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                                                        Machine Learning
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                                                        Database Systems
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Professional Experience</h2>
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                                        Add Experience
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="bg-gray-700 rounded-lg p-6">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-medium text-white">{exp.company}</h3>
                                                    <p className="mt-1 text-gray-300">{exp.position}</p>
                                                    <p className="mt-1 text-gray-400">{exp.duration}</p>
                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-medium text-gray-400">Key Responsibilities</h4>
                                                        <ul className="mt-2 list-disc list-inside text-gray-300">
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
        </div>
    );
}

export default UserComp;