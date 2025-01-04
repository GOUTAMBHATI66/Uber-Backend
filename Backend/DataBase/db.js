const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to the DataBase")
    }).catch((error) => {
        console.log("Error in connecting to the DataBase",error)
    })
}

module.exports = connectToDB