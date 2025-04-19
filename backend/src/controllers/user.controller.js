import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists: username or email or both
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    // create user object- create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    const { fullName, username, email, password,course,graduationYear, profession, skills,company,location,linkedInUrl } = req.body
    // console.log("email: ", email);

    if (
        !fullName || typeof fullName !== 'string' || fullName.trim() === "" ||
        !username || typeof username !== 'string' || username.trim() === "" ||
        !email || typeof email !== 'string' || email.trim() === "" ||
        !password || typeof password !== 'string' || password.trim() === "" ||
        !course || typeof course !== 'string' || course.trim() === "" ||
        !graduationYear || isNaN(Number(graduationYear))
    ) {
        throw new ApiError(400, "All required fields must be provided with valid values");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "user with this email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;


    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullName,
        username,
        avatar: avatar.url,
        email,
        password,
        course,
        graduationYear,
        profession: profession || null,
        company: company || null,
        location: location || null,
        skills: skills ? skills.split(',') : [],
        linkedInUrl: linkedInUrl || null
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, " User Registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    // Find user and explicitly include password field
    const user = await User.findOne({
        $or: [{ username }, { email }]
    }).select('+password'); // Important: include the password field

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Verify password
    let isPasswordValid;
    try {
        isPasswordValid = await user.isPasswordCorrect(password);
    } catch (error) {
        // Handle specific password errors
        if (error.message.includes('no password set for user')) {
            throw new ApiError(401, "Account not properly set up - please reset your password");
        }
        throw new ApiError(401, "Invalid credentials");
    }

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate tokens and send response
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, 
                    accessToken, 
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1//this removes the field from the document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id).select("+password");
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
    .json({ statusCode: 200,
        data: req.user,
        message: "Current user fetched successfully"});
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {
        fullName,
        email,
        username,
        graduationYear,
        course,
        profession,
        company,
        location,
        skills,
        linkedInUrl
    } = req.body;

    // Validate at least one field is provided
    const updatableFields = [
        'fullName', 'email', 'username', 'graduationYear',
        'course', 'profession', 'company', 'location', 
        'skills', 'linkedInUrl'
    ];
    
    const hasValidField = updatableFields.some(field => req.body[field] !== undefined);
    if (!hasValidField) {
        throw new ApiError(400, "At least one field must be provided for update");
    }

    // Build update object (renamed from updateData to updates for consistency)
    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (graduationYear) updates.graduationYear = graduationYear;
    if (course) updates.course = course;
    if (profession) updates.profession = profession;
    if (company) updates.company = company;
    if (location) updates.location = location;
    if (skills) updates.skills = Array.isArray(skills) ? skills : skills.split(',');
    if (linkedInUrl) updates.linkedInUrl = linkedInUrl;

    // Validate email format if being updated
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updates }, // Changed from updateData to updates
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"))

})






export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
   
}