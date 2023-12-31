const express = require('express')
const app = express()

app.use(express.json())

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
    const person = persons.find(person => person.id === id)
    if (person) { res.json(person) }
    else {
        console.log('404')
        res.status(404).end()
    }
})

app.delete('/api/persons/delete/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('id', id)
    persons = persons.filter(person => {
        person.id !== id
    })
    res.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
    return id
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('body', body)
    // console.log(req.headers)

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})