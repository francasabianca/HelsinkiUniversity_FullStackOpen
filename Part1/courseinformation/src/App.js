import React from "react";

//Header - name of the course
//Content - parts and number of exercises
//Total - total number of exercises

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name : 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  const Part1 = (props) => {
    return (
      <p>
        {props.part1_name} {props.exercises1} 
      </p>
    )
  }
  
  const Part2 = (props) => {
    return (
      <p>
        {props.part2_name} {props.exercises2}
      </p>
    )
  }
  
  const Part3 = (props) => {
    return (
      <p>
        {props.part3_name} {props.exercises3}
      </p>
    )
  }
  
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  } 
  
  const Content = (props) => {
    return (
      <div>
        <Part1 part1_name={props.parts[0].name} exercises1={props.parts[0].exercises} />
        <Part2 part2_name={props.parts[1].name} exercises2={props.parts[1].exercises}/>
        <Part3 part3_name={props.parts[2].name} exercises3={props.parts[2].exercises}/>
      </div>
    )
  }
  
  const Total = (props) => {      
    return (
      <div>
        <p>Number of  exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
    )
  }
    
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
  
export default App; 
