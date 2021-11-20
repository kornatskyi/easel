import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import KonvaBoard from "../components/KonvaBoard"
import styles from "../styles/canvaspage.module.scss"
import { Image } from "blitz"

function CanvasPage(props) {
  const [exportedImage, setExportedImage] = useState<JSX.Element>(
    <Image src={"data:image/png;base64,"} alt="exported image" width={0} height={0} />
  )
  const publishButton = useRef(null)

  console.log(exportedImage)

  return (
    <div className={styles.canvasPage}>
      <h1>Canvas page</h1>
      <KonvaBoard publishButton={publishButton} setExportedImage={setExportedImage} />
      <button ref={publishButton} className={styles.publishButton}>
        Publish
      </button>
      {exportedImage}
    </div>
  )
}

CanvasPage.propTypes = {}

export default CanvasPage
