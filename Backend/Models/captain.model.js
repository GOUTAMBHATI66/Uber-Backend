const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'first name must be at least 3 charater long']
        },
        lastname:{
            type: String,
            minlength:[3, 'last name must be at least 3 charater long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String,
    },
    status:{
       type: String,
       enum: ['active','inactive'],
       default: 'inactive' 
    },
    vehical:{
        vehicalType:{
            type: String,
            enum: ['car','auto','bike'],
            required: true,
        },
        capacity:{
            type: Number,
            required: true,
            minlength: [1, "capacity must be at least 1."]
        },
        color:{
            type: String,
            required: true,
            minlength: [3, 'vehical car must be 3 charater long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'vehical car must be 3 charater long']
        }
    },
    location:{
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        }
    }
})

// generating the jwt
captainSchema.methods.getAuthToken = function() {
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:"24h"})
    return token
}

// comparing the hash password with normal password
captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captainModel', captainSchema)

module.exports = captainModel