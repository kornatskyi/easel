import { BlitzPage } from "blitz"
import { useEffect, useState } from "react"

const CanvasPage: BlitzPage = () => {
  // configs
  const CENTERED = true
  const COLOR = "#000"
  const THICKNESS = 2

  let width, height, currentPath, lastDraw

  useEffect(() => {
    const svg = document.querySelector("svg")
    if (!svg) {
      return
    }
    const setSize = (w, h) => {
      ;(width = w), (height = h)
      svg.setAttribute("width", width)
      svg.setAttribute("height", height)
      svg.setAttribute(
        "viewBox",
        `${CENTERED ? width * -0.5 : 0} ${CENTERED ? height * -0.5 : 0} ${width} ${height}`
      )
    }
    svg.addEventListener("mousedown", () => {
      currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
      currentPath.setAttribute("stroke", COLOR)
      currentPath.setAttribute("stroke-width", THICKNESS)
      currentPath.setAttribute("fill", "none")
      svg.appendChild(currentPath)
    })
    svg.addEventListener("mouseup", () => (currentPath = null))
    svg.addEventListener("mousemove", ({ clientX, clientY }) => {
      if (!currentPath) return
      let d = currentPath.getAttribute("d")
      const x = CENTERED ? clientX - width * 0.5 : clientX
      const y = CENTERED ? clientY - height * 0.5 : clientY
      currentPath.setAttribute("d", d ? d + ` L${x},${y}` : `M${x},${y}`)
    })
    const onResize = () => setSize(window.innerWidth, window.innerHeight)
    window.addEventListener("resize", onResize)
    window.addEventListener("load", onResize)
  }, [])

  return (
    <div>
      <svg></svg>
    </div>
  )
}

export default CanvasPage
