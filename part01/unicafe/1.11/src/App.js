import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
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
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100 + " %"} />
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