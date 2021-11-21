import React from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import { RiArrowDownSLine, RiFontSize } from 'react-icons/ri'
import { isInlineActive, wrap } from '../functions/inlines'

const sizeList = Array.from({ length: 50 }, (_, i) => i + 10)

const Size = () => {
  const editor = useSlate()
  const format = 'size'

  let currentSize = null

  const match = isInlineActive(editor, format)

  if (match && match.length) {
    const f = match.find((m) => m.type == format)

    if (f?.value) currentSize = f.value
  }

  return (
    <>
      <button
        className={clsx(
          currentSize && 'uk-button-primary',
          'uk-button uk-button-default uk-border uk-flex-inline uk-flex-middle',
        )}
        type="button"
      >
        <div className="uk-flex-inline uk-flex-middle">
          <RiFontSize className="uk-margin-small-right" />
          {currentSize || '16'}
        </div>
        <RiArrowDownSLine className="uk-margin-small-left" />
      </button>

      <div data-uk-dropdown="pos:top-center; mode: click">
        <div className="uk-overflow-auto uk-height-max-medium">
          {sizeList.map((list) => (
            <button
              className={clsx(
                currentSize == list && 'uk-button-primary',
                'uk-button uk-button-default uk-display-block uk-width-expand uk-border uk-flex uk-flex-middle uk-text-justify',
              )}
              type="button"
              key={list}
              onMouseDown={(event) => {
                event.preventDefault()
                wrap(editor, String(list), format)
              }}
            >
              {list}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Size
