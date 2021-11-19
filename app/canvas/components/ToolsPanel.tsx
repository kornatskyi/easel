import styles from "../styles/toolpanel.module.scss"
import Tool from "./Tool"
import Range from "./Range"
import { ColorPicker } from "./ColorPicker"
const ToolsPanel = (props) => {
  const { setTool, setStrokeWidth, setStroke, strokeWidth, stroke, undo, redo } = props

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Tool toolName={"pencil"} setTool={setTool} />
        <Tool toolName={"eraser"} setTool={setTool} />
        <Tool toolName={"undo"} setTool={undo} />
        <Tool toolName={"redo"} setTool={redo} />
      </div>
      <div className={styles.settings}>
        <Range value={strokeWidth} setStrokeWidth={setStrokeWidth} />
        <ColorPicker setStroke={setStroke} defaultColor={stroke} />
      </div>
    </div>
  )
}

export default ToolsPanel
