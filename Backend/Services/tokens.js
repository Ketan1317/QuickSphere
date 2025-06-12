const jwt = require("jsonwebtoken")

const createToken = (body) => {
    const payload = {
        username: body.username,
        email: body.email
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}


module.exports = { createToken, verifyToken }