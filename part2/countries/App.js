import { useState, useEffect } from 'react'
import axios from "axios"
import React from "react"
import Filter from "./components/Filter"
import Results from "./components/Results"


const App = () => {

  const [countries, setCountries] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showDetails, setShowDetails] = useState('')
  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
    })
  }

  const showWeather = (info) => {
    debugger
    let weatherInfo
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?lat=-44.34&lon=-10.99&appid=c684599b9b126ad01e0c9e091b87ad91')
      .then(response =>
        setWeather(response.data)
      )
  }

  useEffect(hook, [])

  //functions

  const filterResult = () => {
    
    const filterValue =
      countries.filter(
        country =>
        country.name.common.toLowerCase()
        .includes(filter)
    )
    setFilter ('')
    return filterValue
  }

const filterCountries = (event) => {
  event.preventDefault()
  event.target.value = '' ?
    setFilteredCountries(countries) :
      setFilteredCountries(filterResult())
}

const handleFilterChange = (event) => {
  
    setFilter(event.target.value)
    console.log('event.target.value', event.target.value)
}

  return (
    <div>
      <h2>Countries filter</h2>
      <Filter handleFilterChange={handleFilterChange}
        filterCountries={filterCountries}
          />
      <Results filteredCountries={filteredCountries} showDetails={showDetails} setShowDetails={setShowDetails} showWeather={showWeather} weather={weather}/>
    </div>
  )
}

export default App;
