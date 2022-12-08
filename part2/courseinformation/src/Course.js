import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>

const Part = ({ part }) => <li>{part.name} {part.exercises}</li>

const Content = function ({ parts }) {
  
  return (
    <div>
      <ul>
        {parts.map((item) =>
            <Part key={item.id} part={item}/>
        )}
      </ul>
    </div>
  )
}

const Course = ({ course }) => {
  const courseParts = [...course.parts]
  const sum = courseParts.reduce(function (acc, part) {
    debugger
    return acc += part.exercises}, 0)

  console.log('course', course)
  console.log('course.parts', course.parts)
  console.log('sum', sum)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course