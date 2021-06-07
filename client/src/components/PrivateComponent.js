import React from 'react'
import { Redirect } from 'react-router-dom'

export default function PrivateComponent({ children }){
  const token = window.localStorage.getItem('token')
  if(token){
    return <>{ children }</>
  }else {
    return <Redirect to="/login" />
  }
}