import { useState } from 'react'

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let average = (props.good - props.bad) / all
  let positive = props.good / all * 100

  if (props.clicked === false) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>)
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all} </p>
      <p>average {average} </p>
      <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicked, setClicked] = useState(false)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => { setGood(good + 1); setClicked(true) }}>good</button>
      <button onClick={() => { setNeutral(neutral + 1); setClicked(true) }}>neutral</button>
      <button onClick={() => { setBad(bad + 1); setClicked(true) }}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} clicked={clicked} />
    </div>
  )
}

export default App