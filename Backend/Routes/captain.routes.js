const express = require('express')
const router = express()
const {body} = require('express-validator')
const { captainRegister, captainLogin, captainProfile, captainLogout } = require('../Controllers/captain.controller')
const { authCaptain } = require('../Middlewares/auth.middleware')

// captain register route
router.post("/register", [
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 charater long')
], captainRegister)

// captain login route
router.post("/login",[
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({min:8}).withMessage("Password must be at least 8 charcter long")
],captainLogin)

// captain profile route
router.get('/profile', authCaptain, captainProfile)

// captain logout route
router.get('/logout', authCaptain, captainLogout)

module.exports = router