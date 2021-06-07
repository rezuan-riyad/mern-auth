import React, { useContext, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { nameValidation, emailValidation, passwordValidation } from '../../utils/validators'

export default function StepOne({ stepUp }) {

  // user state for step one, from context
  const { user, setUser } = useContext(UserContext)
  const { fname, lname, email, password,
    fnameErr, lnameErr, emailErr, passwordErr  } = user
  
  // autofocusing to firstName-input
  const inputRef = useRef(null)  
  useEffect( () => {
    inputRef.current.focus()
  },[])

  // user state value change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  // Error handling
  // validation functions return string value
  const handleFnameError = () => {
    setUser({
      ...user,
      fnameErr: nameValidation(fname)
    })
  }

  const handleLnameError = () => {
    setUser({
      ...user,
      lnameErr: nameValidation(lname)
    })
  }

  const handleEmailError = () => {
    setUser({
      ...user,
      emailErr: emailValidation(email)
    })
  }

  const handlePasswordError = () => {
    setUser({
      ...user,
      passwordErr: passwordValidation(password)
    })
  }

  // if no error, then proceed
  const checkError = (e) => {
    if (fnameErr || lnameErr || emailErr || passwordErr ){
      return null
    } else {
      stepUp(e)
    }
  }

  return (
    <Form className="w-75 m-auto">

      <Form.Group>
        <Form.Control
          type="text"
          name="fname"
          onBlur={handleFnameError}
          value={fname}
          onChange={handleChange}
          ref={inputRef}
          autoComplete="on" />
        <Form.Label className={fname ? "text-written" : null}>First Name</Form.Label>
        <Form.Text>{fnameErr}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="lname"
          value={lname}
          onBlur={handleLnameError}
          onChange={handleChange}
          autoComplete="on" />
        <Form.Label className={lname ? "text-written" : null}>Last Name</Form.Label>
        <Form.Text>{lnameErr}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="email"
          value={email}
          onBlur={handleEmailError}
          onChange={handleChange}
          autoComplete="on" />
        <Form.Label className={email ? "text-written" : null}>Email</Form.Label>
        <Form.Text>{emailErr}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onBlur={handlePasswordError}
          onChange={handleChange}
          autoComplete="on" />
        <Form.Label className={password ? "text-written" : null}>Password</Form.Label>
        <Form.Text>{passwordErr}</Form.Text>
      </Form.Group>

      <Button variant="primary"
        className="mr-3"
        onClick={checkError}
        >
        Proceed
      </Button>

    </Form>
  )
}