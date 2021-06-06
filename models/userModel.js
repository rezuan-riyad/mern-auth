const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: Number,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.virtual('fullname').get(function () {
  return this.firstname + ' ' + this.lastname
})

userSchema.virtual('hash_password').set(function (password) {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(password, salt)
})

userSchema.methods = {
  passCheck: function (pass) {
    return bcrypt.compareSync(pass, this.password)
  }
}

module.exports = mongoose.model('User', userSchema)