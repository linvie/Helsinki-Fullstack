import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import service from './services/Phonebook'

const App = () => {
    const [persons, setPersons] = useState([])
    const [data, setData] = useState(persons)
    const handleData = (data) => {
        setData(data)
    }

    useEffect(() => {
        service
            .getAll()
            .then(response => {
                setPersons(response)
                setData(response)
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