import Input from './Input'
import Buttons from './Button'

const Filter = (props) => {
    
    return (
        <form onSubmit={props.filterPersons}>
            <Input text='filter' handleChange={props.handleFilterChange}/>
            <Buttons.Button text='filter' type='submit' />
        </form>
    )
}

export default Filter