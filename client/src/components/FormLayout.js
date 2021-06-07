import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/FormLayout.module.css'
import logo from '../assets/img/logo.png'
import { UserContext } from './contexts/UserContext'

export default function FormLayout({ children }) {
  const { step } = useContext(UserContext)
  const [checkClass, setCheckClass] = useState('stepOne')

  //adding class to change css-color of check-circle
  useEffect(() => {
    switch (step) {
      case 1:
        setCheckClass("stepOne")
        break;
      case 2:
        setCheckClass("stepTwo")
        break;
      case 3:
        setCheckClass("stepThree")
        break;      
      default:
        break;
    }
  },[step])

  return (
    <div className={styles.card}>

      <div className={styles.leftSide}>
        <div className={styles.image}>
          <img src={logo} alt="Profile"/>
        </div>
        <h4 className="text-center"><strong>Registration</strong></h4>
      </div>

      <div className={styles.rightSide}>
        <div className={`${styles.checks} ${checkClass}`}>
          <i className="far fa-check-circle circle1"></i>
          <div className={styles.bar} id="span1"></div>
          <i className="far fa-check-circle circle2"></i>
          <div className={styles.bar} id="span2"></div>
          <i className="far fa-check-circle circle3"></i>
        </div>
        <div className={styles.form}>
          {children}
        </div>
      </div>
    </div>
  )
}