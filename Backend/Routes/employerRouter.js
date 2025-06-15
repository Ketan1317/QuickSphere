const express = require("express");
const { employerLoginHandler, employerSignupHandler, deleteEmpAccout, checkAuthHandler } = require("../Controllers/employerController");
const { protectRoutes } = require("../Middlewares/auth");
const { verifyRole } = require("../Middlewares/roleBasedAuth");
const {createJob, updateJob, getEmployerSpecificJobs, deleteJobPosting, togglePosting , getApplicants , selectTheApplicant , closeExpiredJobs, rejectTheApplicant} = require("../Controllers/jobHandler");
const { getAllProfiles, profileShortlisted, findProfileBySlug, getProfileBy_id } = require("../Controllers/profileController");
const employRouter = express.Router();

employRouter.get("/check-auth", protectRoutes, checkAuthHandler);
employRouter.get("/profile-by-slug/:slug", protectRoutes, findProfileBySlug);

employRouter.post("/employer-login",employerLoginHandler);
employRouter.post("/employer-signup",employerSignupHandler);
employRouter.post("/employer-delAcc",protectRoutes,deleteEmpAccout)

employRouter.post("/create-job/:jobId", protectRoutes,createJob);

employRouter.post("/update-job/:jobId",protectRoutes,updateJob);
employRouter.post("/delete-job/:jobId",protectRoutes,deleteJobPosting);
employRouter.post("/toggle-job/:jobId",protectRoutes,togglePosting);

employRouter.post("/select-applicants/",protectRoutes,selectTheApplicant);
employRouter.post("/reject-applicant",protectRoutes,rejectTheApplicant);

employRouter.post("/close-expiredJobs",protectRoutes,closeExpiredJobs);

employRouter.post("/shortlisting-profile",protectRoutes,profileShortlisted);

employRouter.get("/applicant-profile/:profileId", protectRoutes, getProfileBy_id);

employRouter.get("/get-emp-specific-jobs",protectRoutes,getEmployerSpecificJobs);
employRouter.get("/get-applicants/:jobId",protectRoutes,getApplicants);
employRouter.get("/get-all-profiles",protectRoutes,getAllProfiles);

module.exports = {employRouter}












