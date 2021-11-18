import React, { useRef, useState } from "react"
import { Stage, Layer, Line, Text } from "react-konva"
import styles from "../styles/konva-board.module.scss"

const BOARD_WIDTH = 500
const BOARD_HEIGHT = 400

interface LinePops {
  tool: string
  points: number[]
  stroke: string
  strokeWidth: number
}

const ToolsPanel = (props) => {
  const { setTool, setStrokeWidth, setStroke } = props
  return (
    <div>
      <button value={"pen"} onClick={(e) => setTool(e.target.value)}>
        Pen
      </button>
      <button value={"eraser"} onClick={(e) => setTool(e.target.value)}>
        Eraser
      </button>
      <input
        type="text"
        name="strokeSize"
        placeholder="size"
        onChange={(e) => {
          setStrokeWidth(parseInt(e.target.value))
        }}
      />
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

const KonvaBoard = () => {
  const [tool, setTool] = useState<string>("pen")
  const [lines, setLines] = useState<LinePops[]>([])
  const isDrawing = useRef(false)
  const [strokeWidth, setSrokeWidth] = useState<number>(5)
  const [stroke, setStroke] = useState<string>("#df4b26")

  const handleMouseDown = (e) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y], stroke, strokeWidth }])
  }

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]

    // add point
    //********* FIX IT */
    // temporarry fix with !
    lastLine!.points = lastLine!.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine!)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div className={styles.container}>
      <Stage
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.board}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
      <ToolsPanel setTool={setTool} setStrokeWidth={setSrokeWidth} setStroke={setStroke} />

      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  )
}

export default KonvaBoard
