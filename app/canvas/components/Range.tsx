import React from "react"

const Range = (props) => {
  const { setStrokeWidth, value } = props
  return (
    <div>
      {value}
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
