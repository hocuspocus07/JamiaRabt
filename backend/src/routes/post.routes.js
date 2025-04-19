import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost,
  addComment,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// Apply JWT middleware to all post routes
router.use(verifyJWT);

// Post CRUD
router.post(
    '/', 
    upload.single('image'), // Multer middleware first
    createPost
  );
router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.patch("/:postId", updatePost);
router.delete("/:postId", deletePost);

// Like & Comment
router.post("/:postId/like", toggleLikePost);
router.post("/:postId/comment", addComment);

export default router;