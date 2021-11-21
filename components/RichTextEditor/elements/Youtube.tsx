import clsx from 'clsx'
import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'

const Youtube = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor as ReactEditor, element)

  return (
    <div {...attributes}>
      <div contentEditable={false} className="uk-position-relative">
        <iframe
          src={element.url}
          width="1920"
          height="1080"
          frameBorder="0"
          allowFullScreen
          data-uk-responsive
          data-uk-video="automute: true; autoplay: false"
          title="Youtube"
        ></iframe>
        <button
          className={clsx(
            'image-delete-button uk-button uk-button-primary uk-position-absolute',
          )}
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          data-uk-tooltip="Delete Video"
          title="Delete Video"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>
      {children}
    </div>
  )
}

export default Youtube
