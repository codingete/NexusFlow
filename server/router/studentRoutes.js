import express from "express";
import multer from "multer";
import {
  getAvailableSupervisors,
  getStudentProject,
  submitProposal,
  uploadFiles,
} from "../controllers/studentController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/project",
  isAuthenticated,
  isAuthorized("Student"),
  getStudentProject
);

router.post(
  "/proposal",
  isAuthenticated,
  isAuthorized("Student"),
  submitProposal
);


router.post(
  '/upload-projectid',
  isAuthenticated,
  isAuthorized("Student"),
  //upload.array("files", 10),
  // handleUploadError,
  uploadFiles
);

router.get(
  '/fetch-supervisors',
  isAuthenticated,
  isAuthorized("Student"),
  getAvailableSupervisors
);

export default router;
