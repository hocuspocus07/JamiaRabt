import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import { 
    getPosts, 
    createPost, 
    likePost, 
    addComment,
    getCurrentUser
  } from '../utils/auth.js'; 

// Set the base URL for all API requests
const API_BASE_URL = 'https://jamiarabt.onrender.com/api';

function CommunityFeed() {
    const [activeTab, setActiveTab] = useState('all');
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [activeCommentPost, setActiveCommentPost] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Fetch current user and posts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, postsResponse] = await Promise.all([
                    getCurrentUser(),
                    getPosts()
                ]);
                
                setCurrentUser(userResponse.data.data);
                setPosts(postsResponse.data.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load data');
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle post creation
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = newPost.tags.split(',').map(tag => tag.trim());
            
            const formData = new FormData();
            formData.append('title', newPost.title);
            formData.append('content', newPost.content);
            formData.append('tags', JSON.stringify(tagsArray));
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await createPost(formData);
            setPosts([response.data.data, ...posts]);
            setNewPost({ title: '', content: '', tags: '' });
            setImageFile(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        }
    };

    // Handle image upload
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Handle like/unlike
    const handleLike = async (postId) => {
        try {
            await likePost(postId);
            
            setPosts(posts.map(post => {
                if (post._id === postId) {
                    const isLiked = post.likes.includes(currentUser._id);
                    return {
                        ...post,
                        likes: isLiked
                            ? post.likes.filter(id => id !== currentUser._id)
                            : [...post.likes, currentUser._id]
                    };
                }
                return post;
            }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update like');
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (postId) => {
        if (!commentText.trim()) return;
        
        try {
            const response = await addComment(postId, commentText);
            
            setPosts(posts.map(post => 
                post._id === postId ? { 
                    ...post, 
                    comments: [...post.comments, response.data.data] 
                } : post
            ));
            
            setCommentText('');
            setActiveCommentPost(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add comment');
        }
    };

    // Extract all unique tags from posts
    const allTags = [...new Set(posts.flatMap(post => post.tags))];

    // Filter posts based on active tab
    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => post.tags.includes(activeTab));

    if (isLoading) return <div className="text-center py-10">Loading posts...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <NavBar/>
            {/* Main content */}
            <div className="sm:flex-1 flex flex-col overflow-hidden sm:ml-60">
                {/* Header */}
                <div className="border-b-2 border-gray-800 p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Community Forum</h1>
                    {currentUser && (
                        <span className="text-sm text-gray-400">
                            Welcome, {currentUser.username}
                        </span>
                    )}
                </div>

                {/* Main content area */}
                <div className="flex-1 flex overflow-hidden flex-col sm:flex-row">
                    {/* Feed content */}
                    <div className="flex-1 flex flex-col overflow-y-auto p-4">
                        {/* Create post form */}
                        <div className="bg-gray-200 rounded-lg p-4 mb-4 shadow-lg w-full sm:w-auto">
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
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="text-sm text-gray-400"
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
                        <div className="flex space-x-2 mb-4 sm:py-3 py-10 w-full overflow-x-auto sm:overflow-x-visible sm:flex-wrap">                            
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-3 sm:py-1.5 py-5 rounded-full text-xs font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                All Posts
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTab(tag)}
                                    className={`px-3 sm:py-1.5 py-5 rounded-full text-xs font-medium ${activeTab === tag ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>

                        {/* Posts feed */}
                        <div className="space-y-4">
                            {filteredPosts.map(post => (
                                <div key={post._id} className={`bg-gray-800 rounded-lg p-6 shadow-lg`}>
                                    <div className="flex items-start">
                                        <img
                                            src={post.author?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                            alt={post.author?.username}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-lg">{post.title}</h3>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(post.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 mt-1">{post.author?.username}</p>
                                            <p className="mt-3 text-gray-200">{post.content}</p>

                                            {post.image?.url && (
                                                <div className="mt-4">
                                                    <img 
                                                        src={post.image.url} 
                                                        alt="Post" 
                                                        className="max-w-full h-auto rounded-lg"
                                                    />
                                                </div>
                                            )}

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
                                                <button 
                                                    className="flex items-center space-x-1 hover:text-blue-400"
                                                    onClick={() => handleLike(post._id)}
                                                >
                                                    <svg className="w-5 h-5" fill={post.likes.includes(currentUser?._id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                    <span>{post.likes.length}</span>
                                                </button>
                                                <button 
                                                    className="flex items-center space-x-1 hover:text-blue-400"
                                                    onClick={() => setActiveCommentPost(activeCommentPost === post._id ? null : post._id)}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    <span>{post.comments.length} comments</span>
                                                </button>
                                            </div>

                                            {/* Comment section */}
                                            {activeCommentPost === post._id && (
                                                <div className="mt-4">
                                                    <div className="space-y-3">
                                                        {post.comments.map(comment => (
                                                            <div key={comment._id} className="flex items-start">
                                                                <img
                                                                    src={comment.user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                                                    alt={comment.user?.username}
                                                                    className="w-8 h-8 rounded-full mr-3"
                                                                />
                                                                <div className="bg-gray-700 rounded-lg p-3 flex-1">
                                                                    <p className="font-medium text-sm">{comment.user?.username}</p>
                                                                    <p className="text-gray-200 text-sm mt-1">{comment.text}</p>
                                                                    <p className="text-gray-400 text-xs mt-1">
                                                                        {new Date(comment.createdAt).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-3 flex">
                                                        <input
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                        />
                                                        <button
                                                            onClick={() => handleCommentSubmit(post._id)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 rounded-r-lg"
                                                        >
                                                            Post
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right sidebar*/}
                    <div className="sm:w-80 w-screen sm:h-auto h-40 flex flex-col border-l border-gray-800 p-4 overflow-y-auto">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityFeed;