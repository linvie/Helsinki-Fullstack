import axios from 'axios';
import { useState, useEffect } from 'react';
import Detail from './detail';


const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selected, setSelected] = useState('')

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

    const onClicked = (country) => {
        console.log('clicked', country)
        setSelected(country)
    }

    return (
        <div>
            <div>find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            {countriesFiltered.length > 10 ? (
                <p>Too many matches, specify another filter</p>
            ) : countriesFiltered.length > 1 ? (
                countriesFiltered.map((country) => (<div key={country.name['common']}>
                    <p>{country.name['common']}</p> <button onClick={() => onClicked(country)}>show</button>
                    {selected === country && <Detail country={selected} />}
                </div>

                ))
            ) : countriesFiltered.length === 1 ? (
                <Detail country={countriesFiltered[0]} />
            ) : null
            }
        </div >
    )
}

export default App