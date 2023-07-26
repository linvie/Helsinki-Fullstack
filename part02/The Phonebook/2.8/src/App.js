import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const personsnames = persons.map(person => person.name)


    const addName = (event) => {
        event.preventDefault()
        if (personsnames.includes(newName)) {
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
        // console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}><b >{person.name}</b><br /></div>)}
        </div>
    )
}

export default App