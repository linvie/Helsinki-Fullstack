import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import service from './services/Phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [data, setData] = useState(persons)
    const [Message, setMessage] = useState(null)
    const [error, setError] = useState(false)
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

    const messageChange = (message, err) => {
        setMessage(message)
        setError(err)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={Message} err={error} />
            <Filter persons={persons} show={handleData} />
            <h3>add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} messageChange={messageChange} />
            <h3>Numbers</h3>
            <Persons persons={data} messageChange={messageChange} />
        </div>
    )
}

export default App