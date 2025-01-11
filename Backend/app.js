// setup for the .env file and its cors
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

// importing the cookie-parser
const cookieparser = require('cookie-parser')

// importing the different routes
const userRoutes = require("./Routes/user.routes")
const captainRoutes = require("./Routes/captain.routes")

// setup express and its app
const express = require('express')
const app = express()

// connecting to the database
const connectToDB = require('./DataBase/db')
connectToDB()

// using cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

// home route
app.get("/", (req,res) => {
    res.send("My Name is Goutam")
})

// all the user routes
app.use("/users",userRoutes)

// all the captain routes
app.use("/captains", captainRoutes)


module.exports = app



