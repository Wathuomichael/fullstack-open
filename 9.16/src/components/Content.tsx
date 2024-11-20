import { CoursePart } from "../App"
import Part from "./Part"

const Content = ({ courseParts }: { courseParts: CoursePart[]}) => {
  return (
    <div>
      <Part parts={courseParts} />
    </div>
  )
}

export default Content  
