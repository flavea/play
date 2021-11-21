import clsx from 'clsx'
import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Transforms } from 'slate'
import { useSlateStatic, ReactEditor } from 'slate-react'

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor as ReactEditor, element)

  return (
    <div {...attributes}>
      <div contentEditable={false} className="uk-position-relative">
        <img
          className="uk-display-block uk-margin-auto"
          src={element.url}
          alt={element.alt || ''}
        />
        <button
          className={clsx(
            'image-delete-button uk-button uk-button-primary uk-position-absolute',
          )}
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          data-uk-tooltip="Delete Image"
          title="Delete Image"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>
      {children}
    </div>
  )
}

export default Image
