const mongoose = require('mongoose')
const process = require('process')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://linvie:${password}@helsinki01.bntjmxx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    'id': Number,
    'name': String,
    'number': String
})

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, number) => {
    const person = new Person({
        'id': Math.floor(Math.random() * 1000000),
        'name': name,
        'number': number

    })
    return person
}

if (process.argv.length === 5) {

    const person = addPerson(process.argv[3], process.argv[4])

    person.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else {
    console.log('check your arguments')
    process.exit(1)
}