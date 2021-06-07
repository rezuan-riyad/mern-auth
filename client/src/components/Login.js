import axios from 'axios'
import React, { useReducer } from 'react'
import styles from '../styles/FormLayout.module.css'
import logo from '../assets/img/logo.png'
import { Form, Button } from 'react-bootstrap'
import { loginState, loginReducer } from './reducers/loginReducer'
import { Link, Redirect } from 'react-router-dom'
import MessageDisplay from './MessageDisplay'

export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, loginState)
  const { email, password, isLoggedin, isLoading, error } = state

  const handleChange = (e) => {
    dispatch({
      type: "STATE_CHANGE",
      fieldName: [e.target.name],
      payload: e.target.value
    })
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    if(!email || !password){
      return dispatch({ 
        type: 'SET_ERROR', 
        payload: "Email and Password must be filled."
      })
    } 
    dispatch({ type: 'LOGIN' })
    axios.post("/api/user/signin", { email, password }, {
      "Content-type": "application/json"
    })
      .then(res => {
        const { firstname, lastname, country, city, token } = res.data
        const user = { firstname, lastname, country, city }
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        dispatch({
          type: 'SUCCESS',
          payload: "You are successfully logged in."
        })
      })
      .catch(err => {
        dispatch({
          type: 'FAILED',
          payload: err.response.data.message
        })
      })
  }


  if (isLoggedin) {
    return <Redirect to="/" />
  }

  return (
    <div className={styles.card}>

      <div className={styles.leftSide}>
        <div className={styles.image}>
          <img src={logo} alt="Profile" />
        </div>
        <h4 className="text-center"><strong>Sign In</strong></h4>
      </div>

      <div className={`${styles.rightSide} ${styles.signin}`}>

        <Form className="w-75 m-auto">
          {
            error ? 
            <MessageDisplay error={error} /> : null
          }
          <Form.Group>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="on" />
            <Form.Label className={email ? "text-written" : null}>Email</Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              autoComplete="on" />
            <Form.Label className={password ? "text-written" : null}>Password</Form.Label>
          </Form.Group>

          <Button variant="primary" className="mr-3"
            onClick={handleSubmission}
            disabled={isLoading}>
            {isLoading ? "Logging..." : "Log In"}
          </Button>

          <p className="mt-3">Don't have any account? <Link to="/register">Registration</Link></p>
        </Form>
      </div>
    </div>
  )
}