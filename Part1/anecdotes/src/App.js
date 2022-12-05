import {useState} from 'react';

const anecdotesVotes = new Uint8Array(6)
const copyAnecdotesVotes = [...anecdotesVotes]

const Button = (props) => {
  return (
    <button onClick = {props.onClick}>{props.text}</button>
  )
} 

const Anecdote = (props) => {
  return (
    <p>{props.anecdotes}</p>
  )
}

const Votes = (props) => {
  return (
    <p>has {props.anecdotesVotes} votes</p>
  )
}

const Title = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const App = () => {
  
  const [selected, setSelected] = useState(0)
  const [anecdotesVotes, setAnecdotesVotes] = useState(0);
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software projects makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the decelopment time.',
    'Any fool can write code that a computer can understand. Good programers write code that humas can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const voteAnecdote = () => {
    setAnecdotesVotes(copyAnecdotesVotes[selected] += 1)
    setMostVotedAnecdote(copyAnecdotesVotes.indexOf(Math.max(...copyAnecdotesVotes)))
  }


  return (
    <div>
      <Title text = 'Anecdote of the day'/>
      <Anecdote anecdotes = {anecdotes[selected]}/>
      <Votes anecdotesVotes = {copyAnecdotesVotes[selected]}/>
      <Button text = 'next anecdote' onClick = {randomAnecdote}/>
      <Button text = 'vote' onClick = {voteAnecdote} />
      <Title text= 'Anecdote with most votes' />
      <Anecdote anecdotes = {anecdotes[mostVotedAnecdote]} />
    </div>
  )
}

export default App;
