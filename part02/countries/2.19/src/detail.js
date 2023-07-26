const Detail = ({ country }) => {
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
    </>
    )
}

export default Detail