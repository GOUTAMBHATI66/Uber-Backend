const mongoose = require('mongoose')

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hours in seconds
    }
})

const blackLikstTokenModel = mongoose.model('blackListToken', blackListTokenSchema)

module.exports = blackLikstTokenModel