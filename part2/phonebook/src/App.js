//we need to capture the value inside the input element and add it to the 'person' list of the phonebook and then re-render the list

//* first thing is creating a new component to render the person list (array)
//1-we can start adding the 'prevent default' feature to prevent the form to re-render the entire page
//2-to do that we have to call a function inside the 'onSubmit' 

import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/Person'
import snippets from './Snippets/Snippets'

const App = () => {

  const [number, setNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [personsInServer, setPersonsInServer] = useState([])
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons =>
      setPersons(initialPersons)
    )
  }, [])
  
    const addNewPerson = (event) => {
      event.preventDefault()
      
      const newPerson = {
        name: newName,
        number: number,
      }
      
      const checkIfPersonExists = snippets.checkIfPersonExists(newName, persons);

      if (checkIfPersonExists) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personId = snippets.returnPersonId(newName, persons)
          personService.update(personId, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== personId ? p : response))
          }) 
        }
      } else {
          personService.create(newPerson)
          .then(response => 
            setPersons(persons.concat(response))
          )
      }      
  }

  const removePerson = ({ person }) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      .then(setPersons(persons
        .filter(p => p.id !== person.id)))
    }
  }

  const filterPersonsNames = () => {
    const filterResult = personsInServer.filter(
      person => person.name.toLowerCase().
        includes(filter)
    )
    return filterResult
  }

  const filterPersons = (event) => {
    event.preventDefault()
    event.target.value = '' ?
      setPersons(personsInServer) :
        setPersons(filterPersonsNames())
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
      <Persons persons={persons}
          removePerson={removePerson}/>
    </div>
  )
}

export default App