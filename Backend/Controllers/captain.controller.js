const captainModel = require("../Models/captain.model")
const { validationResult } = require('express-validator')
const captainService = require("../Services/captain.service")
const blackLikstTokenModel = require("../Models/blackListToken.model")

// api for register the new captain
const captainRegister = async (req,res,next) => {
    
   // checking the error in user's input
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
       // status code 400 for bad request
       return res.status(401).json({error: errors.array()})
   }

   // extract credential from frontend
   const {fullname,email,password, vehical} = req.body

   // cheking that captain is already exist or not with provided email, if yes then show an error otherwise continue
   const isCaptainAlreadyExists = await captainModel.findOne({email})
   if(isCaptainAlreadyExists){
    return res.status(401).json({ErrorMessage: "Captain is already exists."})
   }

    // hash the password 
   const hashedPassword = await captainModel.hashPassword(password)

   // create the user using credentials
   const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicalType: vehical.vehicalType,
        capacity: vehical.capacity,
        color: vehical.color,          
        plate: vehical.plate
   })

   // once user created then generate it's token
   const token = captain.getAuthToken()

   // status code 201 for successfully created
   res.status(201).json({token, captain})
}


// api for log in the existing user
const captainLogin = async (req,res,next) => {

    // checking the error in user's input
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({error: errors.array()})
    }

    // extract creadential from fontend
    const {email,password} = req.body

    // checking that any user is register with provided email
    const captain = await captainModel.findOne({email}).select('+password')
    if(!captain){
        return res.status(401).json({ErrorMessage:"Invalid email and password!"})
    }

    // camparing the provided password with captain's hashed password
    const isPassword = await captain.comparePassword(password)
    if(!isPassword){
        return res.status(401).json({ErrorMessage:"Invalid email and password"})
    }

    // generating the token after user verification
    const token = captain.getAuthToken()

    res.cookie('token', token)

    res.status(200).json({token,captain})
}


// api for get the profile the captain
const captainProfile = async (req,res,next) => {
    res.status(200).json(req.captain)
}


// api for logout the current captain
const captainLogout = async (req,res,next) => {

    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blackLikstTokenModel.create({token})

    res.status(200).json({Message: "Logout successfully"})
}


module.exports = {captainRegister,captainLogin, captainProfile, captainLogout}