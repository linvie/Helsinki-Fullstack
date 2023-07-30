import service from '../services/Phonebook'

const Person = ({ persons, messageChange }) => {
    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            console.log('person', person.mongodb_id)
            service
                .deletePerson(person.mongodb_id)
                .then(response => {
                    console.log('delete', response)
                    messageChange(`Deleted ${person.name}`, false)
                })
                .catch(err => {
                    console.log('error', err)
                    messageChange(err.response.data.error, true)
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
