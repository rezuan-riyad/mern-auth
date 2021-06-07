import React, { createContext, useState } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    country: "",
    countryCode: "",
    city: "",
    phone: "",
    fnameErr: "",
    lnameErr: "",
    emailErr: "",
    phoneErr: "",
    countryErr: "",
    cityErr: "",
    passwordErr: ""
  })
  const values = { step, setStep, user, setUser }
  
  return (
    <UserContext.Provider value={values}>
      { children }
    </UserContext.Provider>
  )
}