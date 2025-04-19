import express from "express";
import { 
    searchAlumni, 
    getAlumniProfile,
    updateAlumniProfile,
    addAchievement
} from "../controllers/alumni.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Secure all routes
router.use(verifyJWT);

// Search and filter alumni
router.get("/search", searchAlumni);

// Get alumni profile
router.get("/:id", getAlumniProfile);

// Update profile (professional info)
router.patch("/update-profile", updateAlumniProfile);

// Add achievement
router.post("/achievements", addAchievement);

export default router;