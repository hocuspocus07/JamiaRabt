import React, { useState } from 'react';
import NavBar from './NavBar.jsx';

function CommunityFeed() {
    const [activeTab, setActiveTab] = useState('all');
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Welcome to our community!',
            author: 'Admin',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            content: 'This is the official community forum. Feel free to introduce yourself and start discussions!',
            timestamp: '2 hours ago',
            likes: 24,
            comments: 5,
            tags: ['announcement', 'welcome'],
            isPinned: true
        },
        {
            id: 2,
            title: 'Best practices for React performance',
            author: 'DevExpert',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            content: 'I wanted to share some tips I\'ve collected over the years for optimizing React applications...',
            timestamp: '1 day ago',
            likes: 42,
            comments: 12,
            tags: ['react', 'performance', 'frontend']
        },
        {
            id: 3,
            title: 'Looking for collaborators on open source project',
            author: 'CodeNewbie',
            avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
            content: 'I\'m building a new UI library and would love some help from the community. Anyone interested?',
            timestamp: '3 days ago',
            likes: 15,
            comments: 8,
            tags: ['opensource', 'collaboration']
        }
    ]);

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: ''
    });

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPostObj = {
            id: posts.length + 1,
            title: newPost.title,
            author: 'You',
            avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
            content: newPost.content,
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            tags: newPost.tags.split(',').map(tag => tag.trim()),
            isPinned: false
        };
        setPosts([newPostObj, ...posts]);
        setNewPost({ title: '', content: '', tags: '' });
    };

    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => post.tags.includes(activeTab));

    const allTags = [...new Set(posts.flatMap(post => post.tags))];

    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <NavBar />

            {/* Main content */}
            <div className="sm:flex-1 flex flex-col overflow-hidden ml-60">
                {/* Header */}
                <div className="border-b-2 border-gray-800 p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Community Forum</h1>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Feed content */}
                    <div className="flex-1 flex flex-col overflow-y-auto p-4">
                        {/* Create post form */}
                        <div className="bg-gray-200 rounded-lg p-4 mb-4 shadow-lg">
                            <h2 className="text-lg font-semibold mb-3 text-black">Create a new post</h2>
                            <form onSubmit={handlePostSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Post title"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        placeholder="What's on your mind?"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm h-20 focus:outline-none focus:border-blue-500"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Tags (comma separated)"
                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                                        value={newPost.tags}
                                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Filter tabs */}
                        <div className="flex space-x-2 mb-4 py-3">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                All Posts
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTab(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === tag ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>

                        {/* Posts feed */}
                        <div className="space-y-4">
                            {filteredPosts.map(post => (
                                <div key={post.id} className={`bg-gray-800 rounded-lg p-6 shadow-lg ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}>
                                    {post.isPinned && (
                                        <div className="flex items-center text-blue-400 mb-2">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs font-semibold">PINNED</span>
                                        </div>
                                    )}
                                    <div className="flex items-start">
                                        <img
                                            src={post.avatar}
                                            alt={post.author}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-lg">{post.title}</h3>
                                                <span className="text-xs text-gray-400">{post.timestamp}</span>
                                            </div>
                                            <p className="text-gray-300 mt-1">{post.author}</p>
                                            <p className="mt-3 text-gray-200">{post.content}</p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {post.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs bg-gray-700 text-blue-400 px-2 py-1 rounded-full hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => setActiveTab(tag)}
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-4 flex items-center text-gray-400 space-x-4">
                                                <button className="flex items-center space-x-1 hover:text-blue-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                    <span>{post.likes}</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-blue-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    <span>{post.comments} comments</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-blue-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                    </svg>
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right sidebar*/}
                    <div className="w-80 flex flex-col border-l border-gray-800 p-4 overflow-y-auto">
                        <div className="bg-gray-800 rounded-lg p-4 mb-6">
                            <h2 className="font-bold text-lg mb-3">Popular Topics</h2>
                            <div className="space-y-2">
                                {allTags.slice(0, 5).map(tag => (
                                    <div
                                        key={tag}
                                        className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                                        onClick={() => setActiveTab(tag)}
                                    >
                                        <span className="text-blue-400">#{tag}</span>
                                        <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                                            {posts.filter(p => p.tags.includes(tag)).length} posts
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                            <h2 className="font-bold text-lg mb-3">Online Now</h2>
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex items-center">
                                        <div className="relative">
                                            <img
                                                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}0.jpg`}
                                                alt="User"
                                                className="w-10 h-10 rounded-full mr-3"
                                            />
                                            <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                        </div>
                                        <div>
                                            <p className="font-medium">User{i}</p>
                                            <p className="text-xs text-gray-400">Active now</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityFeed;