const userModel = require('../Models/user.model')
const { validationResult} = require("express-validator")
const userService = require("../Services/user.service")

// api for register user
const registerUser = async (req,res,next) => {

    // checking the error in user's input
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }

    // take all the credentials from frontend
    const {fullName, email, password} = req.body

    // hash the password 
    const hashedPassword = await userModel.hashPassword(password)

    // create the user using credentials
    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    })

    // once user created then generate it's token
    const generatedToken = user.generateAuthToken()

    res.status(201).json({generatedToken, user})
}

module.exports = {registerUser}