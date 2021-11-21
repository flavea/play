import React, { useEffect } from 'react'
import { useSlateStatic } from 'slate-react'
import { insertYoutube } from '../functions/youtube'
import { RiYoutubeFill } from 'react-icons/ri'
import UIkit from 'uikit'
import isUrl from 'is-url'

const YoutubeButton = () => {
  const editor = useSlateStatic()

  useEffect(() => {
    UIkit.util.on('#youtube-modal', 'click', async (e) => {
      e.preventDefault()
      e.target.blur()
      const url = await UIkit.modal.prompt('Youtube Video URL', '')
      if (url && !isUrl(url)) {
        alert('URL is not an url')
      } else if (url) {
        insertYoutube(editor, url)
      }
    })
  }, [])

  return (
    <button
      className="uk-button uk-button-default"
      type="button"
      data-uk-tooltip="Insert a youtube video"
      title="Insert a youtube video"
      id="youtube-modal"
    >
      <RiYoutubeFill />
    </button>
  )
}

export default YoutubeButton
