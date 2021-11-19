import { FaPencilAlt, FaEraser, FaRegQuestionCircle } from "react-icons/fa"
import { TiArrowBack, TiArrowForward } from "react-icons/ti"

const IconsMapping = (props) => {
  switch (props.name) {
    case "pencil":
      return <FaPencilAlt />
    case "eraser":
      return <FaEraser />
    case "undo":
      return <TiArrowBack />
    case "redo":
      return <TiArrowForward />
    default:
      return <FaRegQuestionCircle />
  }
}

export default IconsMapping
