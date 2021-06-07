/* First Name, Last Name Validation
regex1 allows only alphabets, regex2 checks white spaces */
export function nameValidation(name) {
  const regex1 = /^[a-z]*$/i
  const regex2 = /\s+/g

  if (!name) return "This field is required"
  else if (name.length < 3) return "At least three charecters are required."
  else if (regex2.test(name)) return "White spaces are not allowed."
  else if (!regex1.test(name)) return "Only english alphabets are allowed."
  return ""
}


/* Email Validation : return error message
regex from w3resource */
export function emailValidation(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email) return "Email is required."
  else if (!regex.test(email)) return "Invalid email address."
  return ""
}

/* Password Validation : return error message
password should contain lowercase, uppercase, sign, digits */
export function passwordValidation(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  if (!password) return "Password is required."
  else if (regex.test(password)) return ""
  return "Should be at least 8 charecters (uppercase, lowercase, digits)."
}

/* Country Name or City Name Validation, Only alphabets should be allowed */
export function placeValidation(place) {
  const regex = /^[a-z]*$/i

  if (!place) return "This field is required."
  else if (!regex.test(place)) return "Only alphabets are allowed."
  return ""
}

/* Phone Number Validation, Only numeric values should be allowed */
export function phoneValidation(phone) {
  const regex = /^[0-9]*$/g

  if (!phone) return "This field is required."
  else if (!regex.test(phone)) return "Invalid Phone Number"
  return ""
}