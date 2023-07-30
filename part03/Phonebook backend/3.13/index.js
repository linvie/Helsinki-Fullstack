require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(express.static('build'))

app.get('/info', (req, res) => {
    Person.find().then(result => {
        res.send(`<p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.find({
        id: Number(req.params.id)
    }).then(result => {
        if (result.length === 0) {
            res.status(404).end()
        } else {
            res.json(result)
        }
    })
})


//findById use  mongodb_id
// app.get('/api/persons/:id', (req, res) => {
//     Person.findById(req.params.id).then(person => {
//         res.json(person)
//     })
// })
// Person.findById('64c4f63076a5f2e4b9396ca0').then(result => {
//     console.log(result.toJSON())
// }).catch(error => {
//     console.log('error', error)
// })


app.delete('/api/persons/delete/:id', (req, res) => {
    console.log('id', req.params.id)
    Person.deleteOne({
        id: Number(req.params.id)
    })
        .then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'Resource not found' });
            } else {
                res.status(204).end();
            }
        })
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
    return id
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    // console.log('body', body)
    // console.log(req.headers)
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(persons)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})