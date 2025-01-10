const userModel = require("../Models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackLikstTokenModel = require("../Models/blackListToken.model")

const authUser = async (req,res,next) => {
    
    // accessing the token after login the user
    const token = req.cookies.token || req.headers.authorization?.splite(' ')[1]

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
        const decodedDetails = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decodedDetails._id)

        req.user = user

        return next()

    } catch (error) {
        return res.status(401).json({ErrorMessage:"Unathorized"})
    }
}

module.exports = {authUser}