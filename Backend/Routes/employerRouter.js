const express = require("express");
const { employerLoginHandler, employerSignupHandler, deleteEmpAccout } = require("../Controllers/employerController");
const { protectRoutes } = require("../Middlewares/auth");
const { verifyRole } = require("../Middlewares/roleBasedAuth");
const {createJob, updateJob, getEmployerSpecificJobs, deleteJobPosting, togglePosting , getApplicants , selectTheApplicant , closeExpiredJobs, rejectTheApplicant} = require("../Controllers/jobHandler");
const { getAllProfiles, profileShortlisted } = require("../Controllers/profileController");
const employRouter = express.Router();

employRouter.post("/employer-login",employerLoginHandler);
employRouter.post("/employer-signup",employerSignupHandler);
employRouter.post("/employer-delAcc",protectRoutes,verifyRole("Employer"),deleteEmpAccout)

employRouter.post("/create-job/:jobId", protectRoutes, verifyRole("Employer"), createJob);

employRouter.post("/update-job/:jobId",protectRoutes,verifyRole("Employer"),updateJob);
employRouter.post("/delete-job/:jobId",protectRoutes,verifyRole("Employer"),deleteJobPosting);
employRouter.post("/toggle-job/:jobId",protectRoutes,verifyRole("Employer"),togglePosting);

employRouter.post("/select-applicants/",protectRoutes,verifyRole("Employer"),selectTheApplicant);
employRouter.post("/reject-applicant",protectRoutes,verifyRole("Employer"),rejectTheApplicant);

employRouter.post("/close-expiredJobs",protectRoutes,verifyRole("Employer"),closeExpiredJobs);

employRouter.post("/shortlisting-profile",protectRoutes,verifyRole("Employer"),profileShortlisted);



employRouter.get("/get-emp-specific-jobs",protectRoutes,verifyRole("Employer"),getEmployerSpecificJobs);
employRouter.get("/get-applicants/:jobId",protectRoutes,verifyRole("Employer"),getApplicants);
employRouter.get("/get-all-profiles",protectRoutes,verifyRole("Employer"),getAllProfiles);

module.exports = {employRouter}












