import { FaPencilAlt, FaEraser, FaRegQuestionCircle } from "react-icons/fa"

const IconsMapping = (props) => {
  switch (props.name) {
    case "pencil":
      return <FaPencilAlt />
    case "eraser":
      return <FaEraser />
    default:
      return <FaRegQuestionCircle />
  }
}

export default IconsMapping
