const express = require('express')
const router = express()
const {body} = require('express-validator')
const { captainRegister } = require('../Controllers/captain.controller')

// captain register route
router.post("/captainRegister", [
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 charater long')
], captainRegister)

module.exports = router