
const Header = (props) => {
  return (
    <div><h1>{props.course}</h1></div>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(obj => {
        return <Part part={obj.name} exercise={obj.exercises} />
      })}
    </div>
  )
}


const Total = (props) => {
  let total = 0;

  props.parts.map(obj => {
    total += obj.exercises;
  });

  return (
    <div>
      <p>Total number of exercises is {total}</p>
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
