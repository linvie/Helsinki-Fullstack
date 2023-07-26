const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>)
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        </div >
    )
}

const Total = (props) => {
    return (
        <div>
            <b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course