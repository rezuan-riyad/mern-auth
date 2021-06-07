import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import csc from 'country-state-city'

// Autocomplete prediction for countries
export default function AutocompleteCountries({ setShowcountries }) {
  const { user, setUser } = useContext(UserContext)
  const { country } = user
  const [countriesList, setCountriesList] = useState([])

  const countries = csc.getAllCountries()

  useEffect(() => {
    if (country) {
      const filteredCountries = countries.filter(item => {
        return item.name.toLowerCase().startsWith(country.toLowerCase())
      })

      const renderedCountries = filteredCountries.map(item => {
        return (
          <li 
          key={item.isoCode} 
          onClick={(e) => setUser({
            ...user,
            country: item.name,
            countryCode: item.isoCode,
            countryErr: ""
          })}
          >{item.name}</li>
        )
      })
      setCountriesList(renderedCountries)
    }
  }, [user, setUser, user.countryCode])

  return (
    <div className="position-relative">
      <ul className="position-absolute autoComplete">
        {countriesList}
        {countriesList.length === 0 ? <li> No match found </li> : null}
      </ul>
    </div>
  )
}
