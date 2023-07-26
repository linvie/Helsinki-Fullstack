const Total = (props) => {
    return (
        <div>
            <b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
        </div>
    )
}

export default Total