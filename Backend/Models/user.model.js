const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

// userSchema
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required:true,
            minlength:[3, 'first name must be at least 3 characters long']
        },
        lastName:{
            type: String,
            minlength:[3, 'first name must be at least 3 characters long']
        }
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        select: false

    },
    soketId:{
        type: String
    }
})

// generating the jwt 
userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:"24h"})
    return token
}

// comparing the hasing password
userSchema.methods.comparePassword = async (password, hashedPass) => {
    return await bcrypt.compare(password, hashedPass)
}

// hasing the normal password
userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}


// generating the user model
const userModel = mongoose.model('user', userSchema)

module.exports = userModel