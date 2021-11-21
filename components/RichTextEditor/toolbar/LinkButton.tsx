import React, { useEffect } from 'react'
import { RiLink, RiLinkUnlink } from 'react-icons/ri'
import { useSlate } from 'slate-react'
import { wrapLink } from '../functions/links'
import { isInlineActive, unwrap } from '../functions/inlines'
import UIkit from 'uikit'
import isUrl from 'is-url'

const LinkButton = () => {
  const editor = useSlate()
  const active = !!isInlineActive(editor, 'link')

  useEffect(() => {
    UIkit.util.on('#link-modal', 'click', async (e) => {
      e.preventDefault()
      e.target.blur()
      const { anchor, focus } = editor.selection
      const url = await UIkit.modal.prompt('URL', '')
      if (url && !isUrl(url)) {
        alert('Submitted URL is not a link')
      } else if (url && anchor.offset == focus.offset) {
        const text = await UIkit.modal.prompt('Link Text', '')
        wrapLink(editor, url, text)
      } else if (url) {
        wrapLink(editor, url, 'New Link')
      }
    })
  }, [])

  if (active) {
    return (
      <button
        className="uk-button uk-button-default uk-button-primary"
        onMouseDown={(event) => {
          event.preventDefault()
          unwrap(editor, 'link')
        }}
        title="Unlink"
        data-uk-tooltip="Unlink"
      >
        <RiLinkUnlink />
      </button>
    )
  }
  return (
    <button
      className="uk-button uk-button-default"
      title="Link to URL"
      data-uk-tooltip="Link to URL"
      id="link-modal"
      type="button"
    >
      <RiLink />
    </button>
  )
}

export default LinkButton
