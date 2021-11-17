import React from "react"
import PropTypes from "prop-types"
import KonvaBoard from "../components/KonvaBoard"

function CanvasPage(props) {
  return (
    <div>
      <h1>Canvas page</h1>
      <KonvaBoard />
    </div>
  )
}

CanvasPage.propTypes = {}

export default CanvasPage
