import service from '../services/Phonebook'

const Person = ({ persons, messageChange }) => {
    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            service
                .deletePerson(person.id)
                .then(response => {
                    console.log('delete', response)
                    messageChange(`Deleted ${person.name}`, false)
                })
        }
        else return
    }

    return (
        <>
            {persons.map(person => <div key={person.name}><div><b >{person.name} {person.number}</b></div><button onClick={() => deletePerson(person)}>delete</button></div>)}
        </>
    )
}


export default Person
