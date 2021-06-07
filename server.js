require('dotenv').config()
const express = require('express')
const path = require('path')
const connectDB = require("./config/db")
const cors = require('cors')

// route
const userRoutes = require('./routes/userRoutes')

// mongodb connection
connectDB()

// app instance
const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())

// body parsing middleware
app.use(express.json())


app.use('/api/user', userRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})