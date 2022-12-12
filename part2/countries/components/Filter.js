import React from "react"
import Button from "./Button"
import Input from "./Input"

const Filter = (props) => {
    
    return (
        <form onSubmit={props.filterCountries}>
            <Input handleChange={props.handleFilterChange}/>
            <Button type='submit' text='Filter'/>
        </form>
    )
}

export default Filter