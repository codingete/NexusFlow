import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";

config();
const app = express();
app.use(
    cors(
    {
origin:[process.env.FRONTED_URL],
methods:["GET" , "POST","PUT", "DELETE"],
credentials: true,
    })

);
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//database connection 

connectDB();

app.use(errorMiddleware);

export default app;
