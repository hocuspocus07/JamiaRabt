import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const author = req.user._id;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  let imageData = null;
  if (req.file?.path) {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }
    imageData = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const post = await Post.create({
    title,
    content,
    author,
    tags,
    image: imageData,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("author", "username fullName avatar");
  
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts fetched successfully"));
  });

  const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;
  
    const post = await Post.findById(postId).populate(
      "author",
      "username fullName avatar"
    );
  
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, post, "Post fetched successfully"));
  });

  const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;
  
    const post = await Post.findById(postId);
  
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    // Check if the current user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only update your own posts");
    }
  
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
  
    await post.save();
  
    return res
      .status(200)
      .json(new ApiResponse(200, post, "Post updated successfully"));
  });

  const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
  
    const post = await Post.findById(postId);
  
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    // Check if the current user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only delete your own posts");
    }
  
    await Post.findByIdAndDelete(postId);
  
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Post deleted successfully"));
  });

  const toggleLikePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
  
    const post = await Post.findById(postId);
  
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    const alreadyLiked = post.likes.includes(userId);
  
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }
  
    await post.save();
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isLiked: !alreadyLiked, likesCount: post.likes.length },
          alreadyLiked ? "Post unliked" : "Post liked"
        )
      );
  });

  const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;
  
    if (!text) {
      throw new ApiError(400, "Comment text is required");
    }
  
    const post = await Post.findById(postId);
  
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    post.comments.push({
      user: userId,
      text,
    });
  
    await post.save();
  
    return res
      .status(201)
      .json(new ApiResponse(201, post.comments, "Comment added successfully"));
  });

  export {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    toggleLikePost,
    addComment
  }