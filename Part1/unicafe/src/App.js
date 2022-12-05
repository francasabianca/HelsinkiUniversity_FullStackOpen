import {useState} from 'react'

const Title = props => <h1>{props.text}</h1>
const Subtitle = props => <h3>{props.text}</h3>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button> 
const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.counter}</td></tr>

const Statistics = (props) => {

  if(props.counterTotal == 0) {
    return (
      <> 
        <Subtitle text = 'No feedback given' />
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' counter = { props.counterGood } />
        <StatisticLine text='neutral' counter = { props.counterNeutral } />
        <StatisticLine text='bad' counter = { props.counterBad } />
        <StatisticLine text='Total' counter = { props.counterTotal } />
        <StatisticLine text='average' counter = { props.averageNumber } />
        <StatisticLine text='positive' counter = { props.feedbackPercentage + '%' } />
      </tbody>      
    </table>
  )
}

const Buttons = (props) => {

  return (
    <>
      <Button text='good' onClick = {props.sumGood} />
      <Button text='bad' onClick = {props.sumBad} />
      <Button text='neutral' onClick = {props.sumNeutral} />
    </>
  )
}

const App = () => {
  const [counterGood, setCounterGood] = useState(0)
  const [counterNeutral, setCounterNeutral] = useState(0)
  const [counterBad, setCounterBad] = useState(0)
  const [counterTotal, setCounterTotal] = useState(0)
  const [averageNumber, setAverageNumber] = useState(0)
  const [feedbackPercentage, setFeedbackPercentage] = useState(0)

  const sumGood = () => {
    let newCounterGood = counterGood + 1
    let newCounterTotal = counterTotal + 1
    setCounterGood(newCounterGood)
    setCounterTotal(newCounterTotal)
    setAverageNumber((newCounterTotal) / 3)
    setFeedbackPercentage(((newCounterGood) / newCounterTotal) * 100) 
    }
  
  const sumNeutral = () => {
    let newCounterNeutral = counterNeutral + 1
    let newCounterTotal = counterTotal + 1
    setCounterNeutral(newCounterNeutral)
    setCounterTotal(newCounterTotal)
    setAverageNumber(newCounterTotal / 3)
    setFeedbackPercentage(((counterGood) / newCounterTotal) * 100)
  }
  
  const sumBad = () => {
    let newCounterBad = counterBad + 1
    let newCounterTotal = counterTotal + 1
    setCounterBad(newCounterBad)
    setCounterTotal(newCounterTotal)
    setAverageNumber(newCounterTotal / 3)
    setFeedbackPercentage(((counterGood) / newCounterTotal) * 100)
  }

  return (
    <div>
      <Title text = 'give feedback' />
      <Buttons sumGood = {sumGood} sumBad = {sumBad} sumNeutral = {sumNeutral}/>
      <Title text = 'Statistics' />
      <Statistics counterBad = {counterBad} counterGood = {counterGood} counterNeutral = {counterNeutral} counterTotal = {counterTotal} averageNumber = {averageNumber} feedbackPercentage = {feedbackPercentage} />
    </div>
  )
}

export default App;