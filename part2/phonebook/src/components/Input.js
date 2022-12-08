const Input = (props) => {
    return (
        <div>
            {props.text}<input  onChange={props.handleChange} />
        </div>
    )
}

export default Input