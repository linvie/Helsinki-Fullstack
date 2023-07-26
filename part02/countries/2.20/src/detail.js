import { useEffect, useState } from "react"
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY


const Detail = ({ country }) => {
    // console.log('capital', country.capital, typeof (country.capital))
    const [weather, setWeather] = useState([])
    const capital = '' + country.capital
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
    // console.log(url)
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                // console.log('weather', response.data.main.temp)
                setWeather(response.data)
            })
    }, [])

    console.log('w', weather.main, typeof (weather.main))

    return (<>
        <h2>{country.name['common']}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.keys(country.languages).map(lang => (
                <li key={lang}>{country.languages[lang]}</li>))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main ? weather.main.temp : null} Celcius</p>
        <img src={`http://openweathermap.org/img/w/${weather.weather ? weather.weather[0].icon : null}.png`} alt={weather.weather ? weather.weather[0].description : null} />
        <p>wind: {weather.wind ? weather.wind.speed : null} m/s</p>

    </>
    )
}

export default Detail