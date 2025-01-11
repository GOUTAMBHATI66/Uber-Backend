const captainModel = require("../Models/captain.model")
const { validationResult } = require('express-validator')
const captainService = require("../Services/captain.service")


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

module.exports = {captainRegister}