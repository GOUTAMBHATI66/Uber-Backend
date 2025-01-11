const userModel = require('../Models/user.model')
const { validationResult} = require("express-validator")
const userService = require("../Services/user.service")
const blackLikstTokenModel = require('../Models/blackListToken.model')

// api for register user
const registerUser = async (req,res,next) => {

    // checking the error in user's input
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // status code 400 for bad request
        return res.status(400).json({error: errors.array()})
    }

    // take all the credentials from frontend
    const {fullName, email, password} = req.body


    // cheking that user is already exist or not with provided email, if yes then show an error otherwise continue
    const isUserAlreadyExists = await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.stauts(401).json({ErrorMessage: "User Already Exists."})
    }

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
    const token = user.generateAuthToken()

    // status code 201 for successfully created
    res.status(201).json({token, user})
}

// api for login user
const loginUser = async (req,res,next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }

    // taking credential form frontend
    const {email,password} = req.body

    // searching user from its email
    const user = await userModel.findOne({email}).select('+password')

    // if user is not availble then show the error
    if(!user) {
        return res.status(401).json({ErrorMessage :" Invalid email and password"})
    }

    // if user available then compare its password with entered password
    const isSamePass = await user.comparePassword(password, user.password)

    // if password is dismatched then show the error
    if(!isSamePass) {
        return res.status(401).json({ErrorMessage: "Invalid email and password"})
    }

    // if password also matched, it means user is exists then genertate the token
    const generatedToken = user.generateAuthToken()

    res.cookie('token', generatedToken)

    res.status(200).json({generatedToken, user})
}

// api for geting the user profile or data
const getUserProfile = async (req,res,next) => {
    res.status(200).json(req.user)
}

// api for logout the user
const userLogout = async (req,res,next) => {
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.splite(' ')[1]

    await blackLikstTokenModel.create({token})

    res.status(200).json({Success:"Logout successfully"})
}

module.exports = {registerUser, loginUser, getUserProfile,userLogout}