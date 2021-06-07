import axios from 'axios';
import React, { useContext, useReducer } from 'react'
import { Button } from "react-bootstrap";
import { UserContext } from '../contexts/UserContext'
import { signupState, signupReducer } from '../reducers/registerReducer'
import { Link } from 'react-router-dom'
import MessageDisplay from '../MessageDisplay';

export default function StepThree({ stepDown }) {

  const [state, dispatch] = useReducer(signupReducer, signupState)
  const { user } = useContext(UserContext)
  const { fname, lname, email, password, country, city, phone } = user
  const { isSubmitting, isSubmitted, error, message } = state

  const handleSubmission = async (e) => {
    e.preventDefault()
    const data =
    {
      firstname: fname,
      lastname: lname,
      email: email,
      phone: phone,
      city: city,
      country: country,
      password: password
    }
    dispatch({ type: "SIGNUP" })

    axios.post("/api/user/signup", data, {
      "Content-type": "application/json"
    })
      .then(res => {
        if (res.status === 200 && res.statusText === "OK") {
          dispatch({ type: "SUCCESS", payload: res.data.message })
        } else if (res.status === 201) {
          dispatch({ type: "SUCCESS", payload: res.data.message })
        }
      })
      .catch(err => {
        dispatch({ type: "FAILED", payload: "Something went wrong." })
      })
  }

  return (
    <div className="w-75 m-auto pt-5">
      { error ? <MessageDisplay error={error} /> : null }
      {
        isSubmitted ? (
          <>
            <h5>{message}</h5>
            <Link to="/login">
              <Button variant="primary"
                className="mr-3">
                Login Now
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h5>{error}</h5>
            <p><strong>Name: </strong>{fname} {lname}</p>
            <p><strong>Email: </strong>{email}</p>
            <p><strong>Phone: </strong>{phone}</p>
            <p><strong>Location: </strong> {city}, {country}</p>
            <Button variant="primary"
              className="mr-3"
              onClick={handleSubmission}
              disabled={isSubmitting}>
              Confirm
            </Button>
            <Button variant="secondary"
              className="mr-3"
              onClick={stepDown} >
              Back
            </Button>
          </>
        )
      }
    </div>
  )
}