import Buttons from './Button'

const Person = ({ person, removePerson }) => {
    
    return <li>{person.name} {person.number}<Buttons.DeleteButton person={person} removePerson={removePerson}/></li>
}

const Persons = ({ persons, removePerson }) => {
    
    return (
        <div>
            <ul>
                {persons.map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}
            </ul>
        </div>
    )
}

export default Persons