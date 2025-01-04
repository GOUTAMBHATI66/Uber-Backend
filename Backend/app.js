// setup for the .env file and its cors
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

// setup express and its app
const express = require('express')
const app = express()

// using cors
app.use(cors())

// home route
app.get("/", (req,res) => {
    res.send("My Name is Goutam")
})

module.exports = app



