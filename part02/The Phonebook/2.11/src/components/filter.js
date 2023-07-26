import { useState } from 'react'

const Filter = (props) => {
    const [filter, setFilter] = useState('')
    const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        props.show(personsToShow)
    }


    return (
        <div>filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter;