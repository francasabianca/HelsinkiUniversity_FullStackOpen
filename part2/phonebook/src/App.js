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
import Notification from './components/Notification'

const App = () => {

  const [number, setNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('')
  
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
            .catch(() => {
              setMessage(`${newName} has already been removed from the server!`)
              setMessageStyle('messageError')
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
          setMessage(`${newName} changed succesfully!`)
          setMessageStyle('messageOk')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      } else {
          personService.create(newPerson)
          .then(response => 
            setPersons(persons.concat(response))
            )
            setMessage(`${newName} added succesfully!`)
            setMessageStyle('messageOk')
            setTimeout(() => {
              setMessageStyle(null)
            }, 5000)
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
      personService.getAll()
      .then(response =>
        setPersons(response
          .filter(p => p.name.toLowerCase()
            .includes(filter))
        ))
  }

  const filterPersons = (event) => {
    event.preventDefault()
    event.target.value = '' ?
      setPersons(persons) :
        filterPersonsNames()
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
      <Notification message={message} messageStyle={messageStyle}/>
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