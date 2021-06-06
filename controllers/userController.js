const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @des register new user
// @route POST /api/user/signup
// @access Public
exports.registerUser = (req, res) => {
  const { email } = req.body

  User.findOne({email})
    .exec((error, user) => {
    if(error) return res.status(400).json({ message: "Something Went Wrong." })
    else if (user) return res.status(200).json({ message: "User already exists." })
    else {
      const { firstname, lastname, phone, country, city, password } = req.body

      const _user = new User({
        firstname,
        lastname,
        email,
        country,
        city,
        phone,
        hash_password: password })

      _user.save( function(err, data){
        if(err) return res.status(400).json({ message: err })
          return res.status(201).json({ message: "User saved successfully" })
      })
    }
  })
}

// Generate access token
function getAccessToken(id) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
}

// @des Authenticate User and Get Access Token
// @route POST /api/user/signin
// @access Public
exports.userLogin = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
    .exec(( error, user ) => {
      if(error) return res.status(400).json({ error })
      if(user && user.passCheck(password)) {
        res.status(200).json({
          firstname: user.firstname,
          lastname: user.lastname,
          country: user.country,
          city: user.city,
          token: getAccessToken(user._id)
        })
      } else if(!user){
        res.status(400).json({ message: "User does not exist." })
      } else {
        res.status(400).json({ message: "Wrong combination."})
      }
    })
}
