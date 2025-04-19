import React from 'react'

function ProfileCard({ name, avatar, location, profession, company, course, graduationYear, joinDate, tags }) {
  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="border-b border-gray-700 px-3 py-4">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img 
              className="h-16 w-16 rounded-full border-2 border-gray-700"
              src={avatar} 
              alt={name}
            />
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-lg text-white truncate">{name}</h3>
            <div className="inline-flex text-gray-300 items-center text-sm">
              <svg className="h-4 w-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 text-xs rounded-full border border-gray-600 text-white px-2 py-1">
            Message
          </button>
        </div>
      </div>
      <div className="px-3 py-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <svg className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span className="truncate">{profession} at {company}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <svg className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="truncate">{course} ({graduationYear})</span>
          </div>
          <div className="flex items-center text-gray-300">
            <svg className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="truncate">Joined {joinDate}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;