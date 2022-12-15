import Input from './Input'
import Buttons from './Button'

const Form = (props) => {
    
    return (
        <form onSubmit={props.addNewPerson}>
            <Input text='name' handleChange={props.handleNameChange}/>
            <Input text='number' handleChange={props.handleNumberChange} />
            <Buttons.Button type='submit' text='add'/>
        </form>
    )
}

export default Form