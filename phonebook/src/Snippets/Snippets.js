const checkIfPersonExists = (newName, persons) => {
    
    const checkResult = persons.some(
      person => person.name === newName ?
        person : false)
      return checkResult
  }

const returnPersonId = (newName, persons) => {
    
    const person = persons.filter(p => p.name === newName ? p.id : undefined)
    return person[0].id
}

  export default { checkIfPersonExists, returnPersonId }