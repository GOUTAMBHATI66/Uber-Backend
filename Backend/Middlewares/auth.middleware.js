const userModel = require("../Models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackLikstTokenModel = require("../Models/blackListToken.model")
const captainModel = require("../Models/captain.model")

// user authentication middleware
const authUser = async (req,res,next) => {
    
    // accessing the token after login the user
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    // when token is not availble then show an error
    if(!token){
        return res.status(401).json({ErrorMessage:"Unauthorized"})
    }

    // check that your token is black liksted or not
    const isBlackListed = await blackLikstTokenModel.findOne({token:token})
    if(isBlackListed){
        return res.status(401).json({ErrorMessage:"Unauthorized"})
    }

    // if token is availble then decode and extract the details from it and find the related user then return this user in req.user
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        req.user = user

        return next()

    } catch (error) {
        return res.status(401).json({ErrorMessage:"Unathorized",error})
    }
}

// captain authentication middleware
const authCaptain = async (req,res,next) => {

    // accessing the token after login the captain
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({ErrorMessage:"Unauthorized"})
    }

    // check that your token is black liksted or not
    const isBlackListed = await blackLikstTokenModel.findOne({token:token})
    if(isBlackListed){
        return res.status(401).json({ErrorMessage:"Unathorized"})
    }


    // if token is availble then decode and extract the details from it and find the related user then return this user in req.user
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        
        req.captain = captain
        
        return next()

    } catch (error) {
        return res.status(401).json({ErrorMessage: "Unauthorized",error})
    }
}

module.exports = {authUser, authCaptain}