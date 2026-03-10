import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minLength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        default: "Student",
        enum: ["Student", "Teacher", "Admin"]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    department: {
        type: String,
        trim: true,
        default: null,
    },
    expertise: {
        type: [String],
        default: [],
    },
    maxStudents: {
        type: Number,
        default: 10,
        min: [1, "Min Students is must be at least 1"],
    },
    assignedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    projects: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },
        deadline: Date
    }],
}, { timestamps: true }
);
