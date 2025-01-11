const captainModel = require('../Models/captain.model')

const createCaptain = async ({firstname,lastname, email,password,vehicalType,capacity,color,plate}) => {

    // throwing error if any field in empty
    if(!firstname || !email || !password || !vehicalType || !capacity || !color || !plate){
        return res.status(401).json({ErrorMessage: "All the fields are required."})
    }

    // here i am taking both model's name and user field's name as same that's why i don't need to initialize them into model's name
    // firstName = this.firstName  (don't need to do) instead it i will firstName
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        vehical:{
            vehicalType,
            capacity,
            color,
            plate,
        }

    })

    return captain
}

module.exports = {createCaptain}