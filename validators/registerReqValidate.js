const { check, validationResult } = require('express-validator')

exports.regReqValidator = [
  check('firstname')
    .not()
    .isEmpty()
    .withMessage('Firstname is required.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('At least 3 charecters are required.')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed.'),
  check('lastname')
    .not()
    .isEmpty()
    .withMessage('Lastname is required.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('At least 3 characters are required.')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required.')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address.'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage('Password should be at least 8 charecters long with at least one uppercase, lowercase and digit.'),
  check('country')
    .not()
    .isEmpty()
    .withMessage('Country is required.'),
  check('city')
    .not()
    .isEmpty()
    .withMessage('City is required.'),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone is required.')
]

exports.isRegReqValidated = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // response errors as list
    const errList = errors.array().map( err => {
      return err.param + ": " + err.msg
    })
    return res.status(400).json({ errors: errList })
  }
  next()
}