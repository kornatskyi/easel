import React from "react"
import styles from "../styles/range.module.scss"

const Range = (props) => {
  const { setStrokeWidth, value } = props
  return (
    <div className={styles.rangeContainer}>
      <span> {value}</span>
      <input
        defaultValue={value}
        min="1"
        max="100"
        type="range"
        name="strokeSize"
        placeholder="size"
        onChange={(e) => {
          setStrokeWidth(parseInt(e.target.value))
        }}
      />
    </div>
  )
}

export default Range
