import React from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import {
  isMarkActive,
  toggleMark,
} from 'components/RichTextEditor/functions/marks'

const MarkButton = ({ format, children, className = '', ...props }) => {
  const editor = useSlate()
  return (
    <button
      className={clsx(
        className,
        'uk-button uk-button-default',
        isMarkActive(editor, format) && 'uk-button-primary',
      )}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default MarkButton
