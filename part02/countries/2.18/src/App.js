import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                // console.log('response', response.data[35].flags)
                setCountries(response.data)

            })
    }, [])

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const countriesFiltered = countries.filter(country => country.name['common'].toLowerCase().includes(filter.toLowerCase()))
    // console.log(country)

    return (
        <div>
            <div>find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            {countriesFiltered.length > 10 ? (
                <p>Too many matches, specify another filter</p>
            ) : countriesFiltered.length > 1 ? (
                countriesFiltered.map((country) => (
                    <div key={country.name['common']}>{country.name['common']}</div>
                ))
            ) : countriesFiltered.length === 1 ? (<>
                <h2>{country.name['common']}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h2>languages:</h2>
                <ul>
                    {Object.keys(country.languages).map(lang => (
                        <li key={lang}>{country.languages[lang]}</li>))}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
            </>


            ) : null
            }
        </div >
    )
}

export default App