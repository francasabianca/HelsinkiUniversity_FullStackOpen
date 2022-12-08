import Input from './Input'
import Button from './Button'

const Filter = (props) => {
    return (
        <form onSubmit={props.filterPersons}>
            <Input text='filter' handleChange={props.handleFilterChange}/>
            <Button text='filter' type='submit' />
        </form>
    )
}

export default Filter