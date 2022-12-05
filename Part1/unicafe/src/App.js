import {useState} from 'react'

const Title = props => <h1>{props.text}</h1>
const Display = props => <p>{props.text} {props.counter}</p>
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
} 

const App = () => {
  
  const [counterGood, setCounterGood] = useState(0)
  const [counterNeutral, setCounterNeutral] = useState(0)
  const [counterBad, setCounterBad] = useState(0)
  const [counterTotal, setCounterTotal] = useState(0)
  const [counterAverage, setCounterAverage] = useState(0)
  const [feedbackPercentage, setFeedbackPercentage] = useState(0)

  const sumGood = () => {
    setCounterGood(counterGood + 1)
    setCounterTotal(counterTotal + 1)
    setCounterAverage((counterTotal + 1) / 3)
    setFeedbackPercentage(((counterTotal + 1) / 100) * counterGood + 1)
  }
  const sumNeutral = () => {
    setCounterNeutral(counterNeutral + 1)
    setCounterTotal(counterTotal + 1)
    setCounterAverage(counterTotal / 3)
    setFeedbackPercentage(((counterTotal + 1) / 100) * counterGood)
  }

  const sumBad = () => {
    setCounterBad(counterBad + 1)
    setCounterTotal(counterTotal + 1)
    setCounterAverage(counterTotal / 3)
    setFeedbackPercentage(((counterTotal + 1) / 100) * counterGood)
  }
  
  return (
    <div>
      <Title text={'give feedback'} />
      <Button text='good' onClick={sumGood} />
      <Button text='neutral' onClick={sumNeutral} />
      <Button text='bad' onClick={sumBad} />
      <Title text={'statistics'} />
      <Display text='good' counter={counterGood} />
      <Display text='neutral' counter={counterNeutral} />
      <Display text='bad' counter={counterBad} />
      <Display text='Total' counter={counterTotal} />
      <Display text='average' counter={counterAverage}/>
      <Display text='positive' counter={feedbackPercentage}/>
    </div>
  )

}

export default App;