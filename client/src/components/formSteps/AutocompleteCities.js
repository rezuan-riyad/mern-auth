import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import csc from 'country-state-city'

// Autocomplete prediction list for cities
export default function AutocompleteCities({ setShowcities }) {
  const { user, setUser } = useContext(UserContext)
  const { city } = user

  const [cities, setCities] = useState([])
  const [citiesList, setCitieslist] = useState([])

  // get all cities by isoCode
  useEffect( () => {
    let _cities = csc.getCitiesOfCountry(user.countryCode)
    setCities(_cities)
  },[])

  useEffect(() => {
    if (cities) {
      const _cities = cities
        .filter(item => item.name.toLowerCase().startsWith(city.toLowerCase()))
        .map((item, i) => {
          return (
            <li
              key={i}
              onClick={
                 () => {
                  setUser({
                    ...user,
                    city: item.name,
                    cityErr: ""
                  });
                }
              }
            > {item.name} </li>
          )
        })
      setCitieslist(_cities)
    }
  }, [user, setUser])


  return (
    <div className="position-relative">
      <ul className="position-absolute autoComplete"
      >
        {citiesList}
        {citiesList.length === 0 ? <li>No match found</li> : null}
      </ul>
    </div>
  )
}