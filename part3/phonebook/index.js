require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
//const morgan = require('morgan')

app.use(express.static('build'))
app.use(express.json())
//app.use(morgan(':method :url :status :response-time ms :body'))
//data returned in get method

//GET method that returns number of persons in phonebook
app.get('/api/info', (request, response) => {
  const personsNumber = persons.length
  const date = new Date()
  response.send(
    `<h1>Phonebook has info for ${personsNumber} persons</h1>` +
    `<h1>${date}</h1>`
  )
})

//GET method that return all resources
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  
})

//GET method that return a resource by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    }) 
    .catch(error => next(error))
})

//DELETE method that removes a resource by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(results => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  console.log('person', person, 'id', request.params.id)

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      console.log('updated person', updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body || !body.number || !body.name) {
    return response.status(400).json({
      error: 'content misssing'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number
  })

  console.log('person', person)
  
  person.save({person})
    .then(savedPerson => {
      response.json(savedPerson)
    })
  //morgan.token('body', request => JSON.stringify(request.body))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(errorHandler)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})