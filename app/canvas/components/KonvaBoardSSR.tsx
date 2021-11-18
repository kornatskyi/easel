import React, { useRef, useState } from "react"
import { Stage, Layer, Line, Text } from "react-konva"
import styles from "../styles/konva-board.module.scss"
import ToolsPanel from "./ToolsPanel"

const BOARD_WIDTH = 500
const BOARD_HEIGHT = 400

interface LinePops {
  tool: string
  points: number[]
  stroke: string
  strokeWidth: number
}

const KonvaBoard = () => {
  const [tool, setTool] = useState<string>("pencil")
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
        width={window.innerWidth}
        height={BOARD_HEIGHT}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.board}
      >
        <Layer>
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
      <ToolsPanel
        stroke={stroke}
        strokeWidth={strokeWidth}
        setTool={setTool}
        setStrokeWidth={setSrokeWidth}
        setStroke={setStroke}
      />
    </div>
  )
}

export default KonvaBoard
