require('dotenv').config()
const express = require('express')
const connectDB = require("./config/db");
const cors = require('cors')

// route
const userRoutes = require('./routes/userRoutes')

// mongodb connection
connectDB()

// app instance
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

// body parsing middleware
app.use(express.json())


app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})