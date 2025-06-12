const express = require("express");

const verifyRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            res.status(500).json({success:false,message:"Not Authorized"})
        }
        next();
    }
}


module.exports = {verifyRole}