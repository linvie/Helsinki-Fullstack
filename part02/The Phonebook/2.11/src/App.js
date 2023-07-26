import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [data, setData] = useState(persons)
    const handleData = (data) => {
        setData(data)
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
                setData(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} show={handleData} />
            <h3>add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h3>Numbers</h3>
            <Persons persons={data} />
        </div>
    )
}

export default App