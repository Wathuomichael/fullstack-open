import { CoursePart } from "../App"

const assertNever = (value: never): never => {
  throw new Error(`Unhandled dicriminated union member: ${JSON.stringify(value)}`);
}

const Part = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part: CoursePart) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p>{part.description}</p>
              </div>
            );
            case "group":
              return (
              <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p>Project Exercises: {part.groupProjectCount}</p>
              </div>
              );
            case "background":
              return (
              <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p>{part.description}</p>
                <p>{part.backgroundMaterial}</p>
              </div>
              );
            case "special":
              return (
                <div>
                  <h2>{part.name} {part.exerciseCount}</h2>
                  <p>{part.description}</p>
                  <p>required skills: {part.requirements[0]}, {part.requirements[1]}</p>
                </div>
              );
          default:
            assertNever(part);
        }
      })}
    </div>
  );
}

export default Part 
