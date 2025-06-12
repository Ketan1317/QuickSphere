const express = require("express");
const { User } = require("../Models/user");
const  bcrypt  = require("bcrypt")
const { createToken, verifyToken } = require("../Services/tokens")



const userSignupHandler = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(401).json({ success: false, message: "Insufficient Credentials" })
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(401).json({ success: false, message: "Email already in use" })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const userDetails = await User.create({
            username, password: hashedPass, email
        })
        const token = createToken(userDetails);
        res.status(200).json({ success: true, message: "Account created successfully", token, user: userDetails })

    } catch (error) {
        res.status(401).json({ success: false, message: error.message })
    }
}


const userLoginHandler = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ success: false, message: "Insufficient Credentials" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: "No user available with this email" })
        }
        const savedPass = user.password;
        const isCorrectPass = await bcrypt.compare(password, savedPass);
        if (!isCorrectPass) {
            res.status(401).json({ success: false, message: "Incorrect Password" })
        }
        const token = createToken(user);
        res.status(200).json({ success: true, message: "Login successfully", token, user })

    } catch (error) {
        res.status(401).json({ success: false, message: error.message })

    }
}

const checkAuth = (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { checkAuth, userLoginHandler, userSignupHandler }