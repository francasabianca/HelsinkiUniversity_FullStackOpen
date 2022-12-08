import Input from './Input'
import Button from './Button'

const Form = (props) => {
    
    return (
        <form onSubmit={props.addNewPerson}>
            <Input text='name' handleChange={props.handleNameChange}/>
            <Input text='number' handleChange={props.handleNumberChange} />
            <Button type='submit' text='add'/>
        </form>
    )
}

export default Form