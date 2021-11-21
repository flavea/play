import React from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import {
  isBlockActive,
  toggleBlock,
} from 'components/RichTextEditor/functions/blocks'

const BlockButton = ({ format, children, className = '', ...props }) => {
  const editor = useSlate()
  return (
    <button
      className={clsx(
        className,
        'uk-button uk-button-default',
        isBlockActive(editor, format) && 'uk-button-primary',
      )}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default BlockButton
