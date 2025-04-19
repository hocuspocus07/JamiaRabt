import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const searchAlumni = asyncHandler(async (req, res) => {
    const { batchYear, course, profession, skills, location, searchQuery, sortBy } = req.query;
    
    // Build filter object
    const filter = {};
    if (batchYear) filter.graduationYear = batchYear;
    if (course) filter.course = course;
    if (profession) filter.profession = { $regex: profession, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skills) filter.skills = { $in: skills.split(',') };
    
    // Search query (for name or username)
    if (searchQuery) {
        filter.$or = [
            { fullName: { $regex: searchQuery, $options: 'i' } },
            { username: { $regex: searchQuery, $options: 'i' } }
        ];
    }

    // Sorting
    const sortOptions = {};
    if (sortBy) {
        const [field, order] = sortBy.split(':');
        sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
        sortOptions.graduationYear = -1; // Default sort by recent graduates
    }

    const alumni = await User.find(filter)
        .sort(sortOptions)
        .select('-password -refreshToken -email -__v');

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni fetched successfully"));
});

const getAlumniProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid alumni ID");
    }

    const alumni = await User.findById(id)
        .select('-password -refreshToken -email -__v');

    if (!alumni) {
        throw new ApiError(404, "Alumni not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni profile fetched successfully"));
});

const updateAlumniProfile = asyncHandler(async (req, res) => {
    const { 
        profession, 
        company, 
        location, 
        skills, 
        linkedInUrl,
        experience,
        achievements
    } = req.body;

    const updates = {};
    
    // Handle skills conversion safely
    if (skills !== undefined) {
        updates.skills = typeof skills === 'string' 
            ? skills.split(',').map(skill => skill.trim())
            : Array.isArray(skills) 
                ? skills
                : [];
    }

    // Add other fields
    if (profession) updates.profession = profession;
    if (company) updates.company = company;
    if (location) updates.location = location;
    if (linkedInUrl) updates.linkedInUrl = linkedInUrl;
    
    // Handle experience and achievements if provided
    if (experience) {
        updates.experience = typeof experience === 'string'
            ? JSON.parse(experience)
            : experience;
    }
    
    if (achievements) {
        updates.achievements = typeof achievements === 'string'
            ? JSON.parse(achievements)
            : achievements;
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Profile updated successfully"));
});

const addAchievement = asyncHandler(async (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const achievement = { title, description, date: date || new Date() };

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { achievements: achievement } },
        { new: true }
    ).select('achievements');

    return res
        .status(201)
        .json(new ApiResponse(201, user.achievements, "Achievement added successfully"));
});

export {
    searchAlumni,
    getAlumniProfile,
    updateAlumniProfile,
    addAchievement
};