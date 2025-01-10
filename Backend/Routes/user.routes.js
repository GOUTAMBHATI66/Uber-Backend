const express = require('express')
const router = express.Router()
const {body} = require(`express-validator`)
const { registerUser, loginUser, getUserProfile, userLogout } = require('../Controllers/user.controller')
const { authUser } = require('../Middlewares/auth.middleware')

// route for register/signup the user
router.post('/register', [
    body('email').isEmail().withMessage("Invalid email address"),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long ')
], registerUser)


// route for login/signin the user
router.post('/login', [
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({min:8}).withMessage("Password must be at least 8 character long")
], loginUser)


// route for accessing the user data after login
router.get("/profile", authUser, getUserProfile)


// route for logout the user
router.get("/logout", authUser, userLogout)

module.exports = router