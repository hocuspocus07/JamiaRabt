import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        select:false
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url
        required: true,

    },
    role: { type: String, enum: ['alumni', 'admin'], default: 'alumni' },
    graduationYear: { type: Number, required:true },
    course: { type: String, required: true,trim:true },
    profession: { type: String },
    company: { type: String },
    location: { type: String },
    achievements: [{
        title: String,
        description: String,
        date: Date
      }],
      linkedInUrl: { type: String },
    experience:[{
        type:String,
        description:String,
        date: Date
    }],  
    skills: [String],
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    // Only hash the password if it's being modified (or is new)
    if (!this.isModified("password")) return next();

    try {
        // Additional check for password existence
        if (!this.password || typeof this.password !== 'string') {
            throw new Error('Password must be a non-empty string');
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error('Password hashing error:', error);
        next(error);
    }
});
  



userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        // Check if password exists and is a string
        if (!password || typeof password !== 'string') {
            throw new Error('Password must be a non-empty string');
        }
        
        // Check if user has a password set
        if (!this.password) {
            throw new Error('Password verification failed - no password set for user');
        }
        
        // Compare passwords
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        throw error; // Re-throw the error for the controller to handle
    }
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)