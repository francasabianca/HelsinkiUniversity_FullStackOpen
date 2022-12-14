const Button = ({ type, text }) => {
    return (
        <button type={type}>{text}</button>
    )
}

const DeleteButton = ({ type, removePerson, person }) => {
    
    return (
        
        <button type='submit' onClick={() => removePerson({ person })}>Delete</button>
    )
}

export default { Button, DeleteButton }