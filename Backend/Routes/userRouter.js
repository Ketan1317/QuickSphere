const express = require("express");
const { userLoginHandler, userSignupHandler, checkAuth } = require("../Controllers/userController");
const { employerLoginHandler, employerSignupHandler } = require("../Controllers/employerController");
const { protectRoutes } = require("../Middlewares/auth");
const UserRouter = express.Router();

UserRouter.post("/user-login",userLoginHandler)
UserRouter.post("/user-signup",userSignupHandler)

UserRouter.get("/just-test",(req,res) => {
    res.send("working")
})

UserRouter.post("/emp-login",employerLoginHandler)
UserRouter.post("/emp-signup",employerSignupHandler)

UserRouter.get("/check-auth",protectRoutes,checkAuth)




module.exports = {UserRouter}