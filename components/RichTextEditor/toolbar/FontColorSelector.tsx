import React, { useEffect, useState } from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import { RiArrowDownSLine, RiFontColor } from 'react-icons/ri'
import IF from 'components/If'
import { GetColorName as getColorName } from 'hex-color-to-color-name'
import { isInlineActive, unwrap, wrap } from '../functions/inlines'
import UIkit from 'uikit'

const Color = () => {
  const editor = useSlate()

  let currentColor = null
  const defaultColor = '#666666'
  const format = 'color'

  const match = isInlineActive(editor, format)

  if (match && match.length) {
    const f = match.find((m) => m.type == format)

    if (f?.value) currentColor = f.value
  }

  const [color, setColor] = useState(currentColor)

  useEffect(() => {
    UIkit.util.on('#color-dropdown', 'hidden', function () {
      setColor(currentColor || defaultColor)
    })
  }, [])

  return (
    <>
      <button
        className={clsx(
          'uk-button uk-button-default uk-border uk-flex-inline uk-flex-middle',
        )}
        style={{ background: currentColor || defaultColor, color: '#fff' }}
        type="button"
      >
        <div className="uk-flex-inline uk-flex-middle">
          <RiFontColor className="uk-margin-small-right" />
          {getColorName(currentColor || defaultColor)}
        </div>
        <RiArrowDownSLine className="uk-margin-small-left" />
      </button>

      <div data-uk-dropdown="pos:top-center; mode: click" id="color-dropdown">
        <div className="uk-padding-small">
          <label
            htmlFor="color-picker"
            className="uk-margin-bottom-small uk-text-small"
          >
            Select color
          </label>
          <input
            type="color"
            value={color || defaultColor}
            onChange={(e) => {
              setColor(e.target.value)
            }}
            className="uk-input"
            name="color-picker"
            id="color-picker"
          />
          <div style={{ color }} className="uk-text-center uk-text-small">
            {color || defaultColor} {getColorName(color || defaultColor)}
          </div>
          <IF condition={currentColor}>
            <button
              className="uk-button uk-button-default uk-margin-small-top uk-width-expand uk-display-block"
              type="button"
              onMouseDown={(event) => {
                event.preventDefault()
                unwrap(editor, 'color')
              }}
            >
              Reset Color
            </button>
          </IF>
          <button
            className="uk-button uk-button-primary uk-margin-small-top uk-width-expand uk-display-block"
            type="button"
            onMouseDown={(event) => {
              event.preventDefault()
              if (color) wrap(editor, color, 'color')
            }}
          >
            Apply Color
          </button>
        </div>
      </div>
    </>
  )
}

export default Color
