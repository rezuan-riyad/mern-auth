import React, { useContext } from 'react'
import StepOne from './formSteps/StepOne'
import StepTwo from './formSteps/StepTwo'
import StepThree from './formSteps/StepThree'
import { UserContext } from './contexts/UserContext'

function Register() {
  const { step, setStep } = useContext(UserContext)

  // form step-up for proceed-button clicked
  const stepUp = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }

  // form step-down for back-button clicked
  const stepDown = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  switch (step) {
    case 1:
      return (
        <React.Fragment>
          <StepOne
            stepUp={stepUp} />
        </React.Fragment>)
    case 2:
      return (
        <React.Fragment>
          <StepTwo
            stepUp={stepUp}
            stepDown={stepDown} />
        </React.Fragment>)
    case 3:
      return (
        <React.Fragment>
          <StepThree stepDown={stepDown} />
        </React.Fragment>
      )
    default:
      break;
  }
}

export default Register