import React, { useCallback, useState } from "react"
import { HexColorPicker } from "react-colorful"
import useClickOutside from "../utils/useClickOutside"
import styles from "../styles/colorpicker.module.scss"

export const ColorPicker = (props) => {
  const { setStroke, defaultColor } = props

  const popover = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const [isOpen, toggle] = useState(false)

  const close = useCallback(() => toggle(false), [])
  useClickOutside(popover, close)
  return (
    <div className={styles.picker}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: defaultColor }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={defaultColor} onChange={setStroke} />
        </div>
      )}
    </div>
  )
}
