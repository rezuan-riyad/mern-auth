import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import AutocompleteCountries from './AutocompleteCountries'
import AutocompleteCities from './AutocompleteCities'
import { placeValidation, phoneValidation } from '../../utils/validators'

export default function StepTwo({ stepUp, stepDown }) {

  // contact and error states from context
  const { user, setUser } = useContext(UserContext)
  const { countryErr, cityErr, phoneErr, country, city, phone } = user

  const [showCountries, setShowcountries] = useState(false)
  const [showCities, setShowcities] = useState(false)

  // contact state change based on input "name"
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  // Error Handling
  const handleCountryError = () => {
    setUser({
      ...user,
      countryErr: placeValidation(country)
    })
  }
  const handleCityError = () => {
    setUser({
      ...user,
      cityErr: placeValidation(city)
    })
  }
  const handlePhoneError = () => {
    setUser({
      ...user,
      phoneErr: phoneValidation(phone)
    })
  }

  // if no error, then proceed
  const checkError = (e) => {
    if (countryErr || cityErr || phoneErr) return null
    else {
      stepUp(e)
    }
  }

  return (
    <Form className="w-75 m-auto">

      <Form.Group>
        <Form.Control
          type="text"
          name="country"
          value={country}
          onBlur={ (e) => {
            handleCountryError();
            setTimeout(() => {
              setShowcountries(false)
            },400) 
          }}
          onFocus={() => setShowcountries(true)}
          onChange={handleChange}
          autoComplete="on"
        />
        <Form.Label className={country ? "text-written" : null}>Country</Form.Label>
        <Form.Text>{countryErr}</Form.Text>
        {showCountries ? <AutocompleteCountries /> : null}
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onBlur={ () => {
            handleCityError();
            setTimeout(() => {
              setShowcities(false)
            }, 400)
          }}
          onFocus={() => setShowcities(true)}
          onChange={handleChange}
          autoComplete="on"
        />
        <Form.Label className={city ? "text-written" : null}>City</Form.Label>
        <Form.Text>{cityErr}</Form.Text>
        {showCities ? <AutocompleteCities /> : null}
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="phone"
          value={phone}
          onBlur={handlePhoneError}
          onChange={handleChange}
          autoComplete="on" />
        <Form.Label className={phone ? "text-written" : null}>Phone No.</Form.Label>
        <Form.Text>{phoneErr}</Form.Text>
      </Form.Group>


      <Button variant="primary" className="mr-3"
        onClick={checkError} >
        Proceed
      </Button>

      <Button variant="secondary"
        onClick={stepDown} >
        Back
      </Button>
    </Form>
  )
}