import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import crypto from "crypto";
import processMultipart from 'express-fileupload/lib/processMultipart';

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
},
{
    timestamps: true,

}
);

userSchema.pre("save",async function (next){
if(!this.isModified("password")){
    next();
}
this.password =await bcrypt.hash(this.password,10);

})
userSchema.methods.generateToken=function(){
return  jwt.sign({id:this._id},processMultipart.env.JWT_SECRET,{
    expiresIn:processMultipart.env.JWT_EXPIRE,
});
};

userSchema.methods.comparePassword = async function (enterPassword){
return await bcrypt.compare(enteredPassword,this.password);
};


userSchema.methods.getRestPasswordToken =function(){
    const restToken =crypto.randomBytes(20).toString("hex");

this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordExpire = Date.now() +15*60*1000;
return resetToken;

};
export const User = mongoose.model("User", userSchema);