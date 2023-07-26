import { useState } from 'react'
import service from '../services/Phonebook'

const PersonForm = ({ persons, setPersons, messageChange }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const personsnames = persons.map(person => person.name.toLowerCase())

    const addName = (event) => {
        event.preventDefault()
        if (personsnames.includes(newName.toLowerCase())) {
            if (window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)) {
                service
                    .update(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id, { name: newName, number: newNumber })
                    .then(response => {
                        console.log('update', response)
                        messageChange(`Updated ${newName}`, false)
                    })
                return
            }
            else return
        }
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        service
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response))
                messageChange(`Added ${newName}`, false)
            })
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm