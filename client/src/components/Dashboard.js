import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default function Dashboard(){
  
  const [loggedin, setLoggedin] = useState(true)

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setLoggedin(false)
  }

  if(!loggedin){
    return <Redirect to="/login" />
  }

  return (
    <>
    <Container className="mt-5">
      <h1>Dashboard</h1>
      <p>{user.firstname} {user.lastname} from {user.city}, {user.country}</p>
      <p>This is protected route. User must be logged in.</p>
      <Button variant="primary" className="mt-2" onClick={handleLogout}>
        Log out
      </Button>
    </Container>
    </>
  )
}