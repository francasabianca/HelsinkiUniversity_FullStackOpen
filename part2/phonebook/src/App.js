//we need to capture the value inside the input element and add it to the 'person' list of the phonebook and then re-render the list

//* first thing is creating a new component to render the person list (array)
//1-we can start adding the 'prevent default' feature to prevent the form to re-render the entire page
//2-to do that we have to call a function inside the 'onSubmit' 

import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/Person'

const App = () => {

  const [number, setNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [personsJSON, setPersonsJSON] = useState([])
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons =>
      setPersons(initialPersons))
    })
    
  const addNewPerson = (event) => {
    event.preventDefault()
      
    const newPerson = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
  
    if(!nameExists()) {
      setPersons(persons.concat(newPerson))
      setPersonsJSON(personsJSON.concat(newPerson))
    } else {
      alert(`${newName} already exists in phonebook`)
    }
  }

  const nameExists = () => {
    const nameExists = persons.map(
      person => person.name).some(
        name => name === newName)
          return (nameExists)
  }

  const filterNames = () => {
    const filterResult = personsJSON.filter(
      person => person.name.toLowerCase().
        includes(filter)
    )
    
    return filterResult
  }

  const filterPersons = (event) => {
    event.preventDefault()
    event.target.value = '' ?
      setPersons(personsJSON) :
        setPersons(filterNames())
    console.log('persons after filter:', persons)
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

  //filteredPersons = [''] ? console.log('esta vacio esto') : console.log('tiene algo esto')

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
      <Persons persons={persons}/>
    </div>
  )
}

export default App