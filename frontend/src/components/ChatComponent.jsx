import React, { useState } from 'react';
import NavBar from './NavBar.jsx';

function ChatComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  
  const chats = [
    {
      id: 1,
      name: "Tony Stark",
      avatar: "https://randomuser.me/api/portraits/men/97.jpg",
      lastMessage: "Hey, Are you there?",
      time: "10min",
      unread: true
    },
    {
      id: 2,
      name: "Scarlett Johansson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      lastMessage: "You sent a photo.",
      time: "1h",
      unread: false
    },
    {
      id: 3,
      name: "Bruce Lee",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastMessage: "You are a great human being.",
      time: "23 Jan",
      unread: false
    }
  ];

  const messages = {
    1: [
      { sender: "them", text: "Hey! How are you?", time: "FRI 3:04 PM" },
      { sender: "me", text: "I'm good, thanks! How about you?", time: "FRI 3:05 PM" },
      { sender: "them", text: "Doing well! Want to grab coffee tomorrow?", time: "FRI 3:06 PM" }
    ],
    2: [
      { sender: "them", text: "Check out this photo I took!", time: "TUE 2:30 PM" },
      { sender: "me", text: "Wow, that's amazing!", time: "TUE 2:35 PM" }
    ],
    3: [
      { sender: "them", text: "You are a great human being.", time: "MON 11:20 AM" },
      { sender: "me", text: "Thanks Bruce, that means a lot!", time: "MON 11:25 AM" }
    ]
  };

  return (
    <div className="h-screen flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <NavBar/>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat list*/}
        <div className="flex flex-row h-full">
          {/* Main chat content */}
          <div className="flex-1 flex flex-col border-r border-gray-800">
            {selectedChat ? (
              <>
                {/* Chat header */}
                <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center border-b border-gray-800">
                  <div className="flex items-center">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                      <img 
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={chats.find(c => c.id === selectedChat).avatar}
                        alt=""
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold">{chats.find(c => c.id === selectedChat).name}</p>
                      <p>Active now</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="chat-body p-4 flex-1 overflow-y-auto">
                  {messages[selectedChat].map((msg, index) => (
                    <div key={index}>
                      {msg.sender === 'them' ? (
                        <div className="flex flex-row justify-start mb-4">
                          <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                            <img 
                              className="shadow-md rounded-full w-full h-full object-cover"
                              src={chats.find(c => c.id === selectedChat).avatar}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                              {msg.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-end mb-4">
                          <div>
                            <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                              {msg.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="chat-footer flex-none p-4 border-t border-gray-800">
                  <div className="flex flex-row items-center">
                    <div className="relative flex-grow">
                      <input 
                        className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                        type="text" 
                        placeholder="Type a message"
                      />
                    </div>
                    <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            )}
          </div>

          {/* Chat list */}
          <div className="w-80 flex flex-col border-l border-gray-800">
            <div className="search-box p-4 flex-none border-b border-gray-800">
              <input 
                className="rounded-full py-2 px-4 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text" 
                placeholder="Search chats"
              />
            </div>
            <div className="contacts p-2 flex-1 overflow-y-auto">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  className={`flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer ${selectedChat === chat.id ? 'bg-gray-800' : ''}`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative flex flex-shrink-0 mr-3">
                      <img 
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={chat.avatar}
                        alt=""
                      />
                      {chat.unread && (
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                          <div className="bg-green-500 rounded-full w-3 h-3"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-bold ${chat.unread ? 'text-white' : 'text-gray-300'}`}>{chat.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{chat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;