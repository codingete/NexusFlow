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
});