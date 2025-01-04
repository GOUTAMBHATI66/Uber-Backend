const express = require('express')
const router = express.Router()
const {body} = require(`express-validator`)
const { registerUser } = require('../Controllers/user.controller')

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email address"),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long ')
], registerUser)

module.exports = router