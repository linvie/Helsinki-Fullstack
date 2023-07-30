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

app.get('/info', (req, res, next) => {
    Person.find().then(result => {
        res.send(`<p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}</p>`)
    })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(result => {
        if (result.length === 0) {
            res.status(404).end()
        } else {
            res.json(result)
        }
    })
        .catch(error => next(error))
})


app.delete('/api/persons/delete/:id', (req, res, next) => {
    console.log('id', req.params.id)
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'Resource not found' });
            } else {
                res.status(204).end();
            }
        })
        .catch(error => next(error))
})



app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log('body', body)
    // console.log(req.headers)
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const person = new Person({
        id: body.id,
        name: body.name,
        number: body.number
    })
    console.log('person', person)
    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => {
        console.log('error', error)
        next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})