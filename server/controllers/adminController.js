import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import * as userService from "../services/userServices.js";

export const createStudent=asyncHandler(async(req,resizeBy,next)=>{
const {name, email,password,department} =req.body;
if(!name||!email||!password||!department){
return next(new ErrorHandler("Please provide all required fields",400));
}
const user=await userServices.createUser({
    name,
    email,
    password,
    department:department ||"",
    role:'student',
});

res.status(201).json({
success:true,
message:"Student created successfully",
data:{user},
});
});

export const updateStudent= asyncHandler(async(req,res,next)=>{
const {id}=req.params;
const updatedData={...req.body};
delete updatedData.role;  //prevent role update

const user = await userServices.updateUser(id, updateData);
if (!user) {
return next(new ErrorHandler("Student not found", 404));
}
res.status(200).json({
success: true,
message: "Student updated successfully",
data: { user },
});
});

const deleteStudent = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const user = await userServices.getUserById(id);
if (!user) {
    throw new ErrorHandler('Student not found', 404);
}

if (user.role !== 'Student') {
    throw new ErrorHandler('User is not a student', 400);
}

await userServices.deleteUser(id);
res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
});

});

export const createTeacher=asyncHandler(async(req,resizeBy,next)=>{
const {name, email,password,department,maxStudents,expertise} =req.body;
if(!name||!email||!password||!department|| !maxStudents|| !expertise){
return next(new ErrorHandler("Please provide all required fields",400));
}
const user=await userServices.createUser({
    name,
    email,
    password,
    department,
    maxStudents,
    expertise: Array.isArray(expertise)
    ? expertise: typeof expertise ==="string" && expertise.trim()!==""
    ? expertise.split(",").map(s=> s.trim()):[],
    role:"Teacher",
});


res.status(201).json({
success:true,
message:"Teacher created successfully",
data:{user},
});
});


export const updateTeacher= asyncHandler(async(req,res,next)=>{
const {id}=req.params;
const updatedData={...req.body};
delete updatedData.role;  //prevent role update

const user = await userServices.updateUser(id, updateData);
if (!user) {
return next(new ErrorHandler("Teacher not found", 404));
}
res.status(200).json({
success: true,
message: "Teacher updated successfully",
data: { user },
});
});

const deleteTeacher = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const user = await userServices.getUserById(id);
if (!user) {
    throw new ErrorHandler('Teacher not found', 404);
}

if (user.role !== 'Teacher') {
    throw new ErrorHandler('User is not a teacher', 400);
}

await userServices.deleteUser(id);
res.status(200).json({
    success: true,
    message: 'Teacher deleted successfully',
});

});


export const getAllUsers= asyncHandler(async(req,res,next)=>{
const {users}=await userServices.getAllUsers();
res.status (200).json({
    success:true,
message:"Users fetched successfully",
data:{users},
});
});

export const assignSupervisor = asyncHandler(async (req, res, next) => {});
export const getAllProject = asyncHandler(async (req, res, next) => {});
export const getDashboardStats = asyncHandler(async (req, res, next) => {});
