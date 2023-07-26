import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const personsnames = persons.map(person => person.name.toLowerCase())

    const addName = (event) => {
        event.preventDefault()
        if (personsnames.includes(newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        setPersons(persons.concat(personObject))
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