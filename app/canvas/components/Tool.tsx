import React from "react"
import styles from "../styles/toolpanel.module.scss"
import dynamic from "next/dynamic"
import IconsMapping from "./IconsMapping"

const Tool = (props) => {
  const { toolName, setTool } = props
  return (
    <div className={styles.tool} onClick={() => setTool(toolName)}>
      <IconsMapping name={toolName} />
    </div>
  )
}

export default Tool
