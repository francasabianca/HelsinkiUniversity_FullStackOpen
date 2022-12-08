//we need to capture the value inside the input element and add it to the 'person' list of the phonebook and then re-render the list

//* first thing is creating a new component to render the person list (array)
//1-we can start adding the 'prevent default' feature to prevent the form to re-render the entire page
//2-to do that we have to call a function inside the 'onSubmit' 

import { useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {

  const [number, setNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const nameExists = () => {
    const nameExists = persons.map(
      person => person.name).some(
        name => name === newName)
          return (nameExists)
  }

  const filterNames = () => {
    const filterResult = persons.filter(
      person => person.name.toLowerCase().
        includes(filter)
    )
    console.log('names', filterResult)
    return filterResult
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = (event) => {
    event.preventDefault()
     event.target.value = '' ?
      setFilteredPersons(persons) :
        setFilteredPersons(filterNames())
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: number,
      id: persons.length + 1
    }

    if(!nameExists()) {
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} already exists in phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}
        filterPersons={filterPersons} />
      <h3>Add a new</h3>
      <Form addNewPerson={addNewPerson} 
          handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App