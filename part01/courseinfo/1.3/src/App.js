const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>)
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Content = () => {
    return (
      <div>
        <Part part={part1.name} exercises={part1.exercises} />
        <Part part={part2.name} exercises={part2.exercises} />
        <Part part={part3.name} exercises={part3.exercises} />
      </div>
    )
  }

  return (
    <div>
      <Header name={course} />
      <Content />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

export default App