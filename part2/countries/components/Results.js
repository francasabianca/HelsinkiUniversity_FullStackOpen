const toggleDetails = ({ country }) => {
    
    return (
        <div>
            {
                country.showDetails ?
                    console.log('true') :
                    this.parent
            }
        </div>
    )
}

const showCountryName = ({ country }) => {
    
    return (
        <li>
            <span key={country.ccn3}>{country.name.common}</span>
            <button key={country.cca2} onClick={() => toggleDetails({country})}>show</button>
        </li>
    )
}

const showCountryDetails = ({ country, showWeather, weather }) => {
    debugger
    const capitalWeather = showWeather(country.capitalInfo.latlng)
    const countryLanguages = Object.values(country.languages)
    return (        
        <div>
            <h3>{country.name.common}</h3>
            <h3>Capital</h3>
            <h5>{country.capital}</h5>
            <h3>Area</h3>
            <h5>{country.area}</h5>
            <h3>Languages</h3>
            <ul>
                {countryLanguages.map(language =>
                  <li key={language}>{language}</li>)}
            </ul>
            <h3>Flag</h3>
            <img src={country.flags.svg} />
            <h2>Weather in {country.capital}</h2>
            <h3>Temperature</h3>
            <span>{weather.temp}</span>
            <img />
            <h3>Wind</h3>
            <span></span>
                    

        </div>
    )
}

const Country = ({showDetails, country, showWeather, weather}) => {
        
        country.showDetails = showDetails
        if(country.showDetails) {
            return showCountryDetails({country, showWeather, weather})
        } else {
            return showCountryName({country})
        }  
}

const Results = ({ filteredCountries, showDetails, setShowDetails, showWeather, weather }) => {
    
    const res = filteredCountries.length
    console.log(filteredCountries)

    if(res === 1) {
        
        const country = filteredCountries[0]

        return (
            <Country showDetails={true} country={country} showWeather={showWeather}/>
        )
        
    } else if (res <= 10) {

        console.log('less or equal than 10 elements')
        
        return (
            <div>
                <ul>
                    {filteredCountries.map((country) => 
                        <Country 
                            key={country.name.common} 
                            showDetails={false} 
                            country={country}/>
                    )}
                </ul>
            </div>   
        )

    } else {
        console.log('more than 10 elements')
        return (
            <h3>Too many matches, specify another filter</h3>
        )
    }
}

export default Results