const Person = ({ person }) => {
    return <li>{person.name} {person.number}</li>
}

const Persons = ({ persons }) => {
    
    return (
        <div>
            <ul>
                    {persons.map(person => <Person key={person.id} person={person} />)} :
            </ul>
        </div>
    )
}

export default Persons