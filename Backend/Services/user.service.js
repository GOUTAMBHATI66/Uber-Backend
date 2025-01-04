const userModel = require("../Models/user.model")

const createUser = async ({firstName,lastName,email,password}) => {

    // throwing error if any field in empty
    if(!firstName || !email || !password){
        throw new Error('All fields are required!')
    }

    // here i am taking both model's name and user field's name as same that's why i don't need to initialize them into model's name
    // firstName = this.firstName  (don't need to do) instead it i will firstName
    const user = userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })

    return user
}

module.exports = {createUser}