import styles from "../styles/toolpanel.module.scss"
import Tool from "./Tool"
import Range from "./Range"
import dynamic from "next/dynamic"
const ToolsPanel = (props) => {
  const { setTool, setStrokeWidth, setStroke, strokeWidth } = props

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Tool toolName={"pencil"} setTool={setTool} />
        <Tool toolName={"eraser"} setTool={setTool} />
      </div>
      <div>
        <Range value={strokeWidth} setStrokeWidth={setStrokeWidth} />
      </div>

      <input
        type="text"
        name="stroke"
        placeholder="stroke"
        onChange={(e) => {
          setStroke(e.target.value)
        }}
      />
    </div>
  )
}

export default ToolsPanel
