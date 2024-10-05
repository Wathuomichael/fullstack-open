const Header = ({ course }) => {
  return (
    <div><h1>{course}</h1></div>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(obj => {
        return <Part key={obj.id} part={obj.name} exercise={obj.exercises} />
      })}
    </div>
  )
}


const Total = ({ parts }) => {
  let total = 0;

  const exercises = parts.map(obj => {
    return obj.exercises;
  });

  console.log(exercises);

  return (
    <div>
      <p>Total number of exercises is {exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, total)}</p>
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

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((item) => {
        return(
          <div key={item.id}>
            <Header course={item.name} />
            <Content parts={item.parts} />
            <Total parts={item.parts} />
          </div>
        )
      })}
    </div>
  );
}


export default Course;
