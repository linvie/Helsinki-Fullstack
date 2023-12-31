const express = require('express')
const app = express()


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    if (persons) { res.json(persons) }
    else {
        res.status(404).end()
    }
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('id', id)
    const person = persons.find(person => person.id === id)
    if (person) { res.json(person) }
    else {
        console.log('404')
        res.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})