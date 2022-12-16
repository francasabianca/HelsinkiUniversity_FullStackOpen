const express = require('express')
const app = express()

//data returned in get method

let persons =
[
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

app.use(express.json())

//get method that returns a json

app.get('/api/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const personsNumber = persons.length
    const date = new Date()
    response.send(
        `<h1>Phonebook has info for ${personsNumber} persons</h1>` +
        `<h1>${date}</h1>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    //return the corresponding resource or a 404 status (not found)
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    console.log(id, typeof id)
    console.log(person)
    
    person ? response.json(person) : response.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})