import React, { useEffect } from 'react'
import { useSlateStatic } from 'slate-react'
import { insertImage, isImageUrl } from '../functions/images'
import { RiImageFill } from 'react-icons/ri'
import UIkit from 'uikit'

const ImageButton = () => {
  /* const [url, setUrl] = useState('dsfsdfds')
  const [alt, setAlt] = useState('') */

  const editor = useSlateStatic()

  useEffect(() => {
    UIkit.util.on('#image-modal', 'click', async (e) => {
      e.preventDefault()
      e.target.blur()
      const url = await UIkit.modal.prompt('Image URL', '')
      if (url && !isImageUrl(url)) {
        alert('URL is not an image')
      } else if (url) {
        const alt = await UIkit.modal.prompt('Image Alt Text', '')
        insertImage(editor, url, alt)
      }
    })
  }, [])

  return (
    <button
      className="uk-button uk-button-default"
      type="button"
      data-uk-tooltip="Insert an image"
      title="Insert an image"
      id="image-modal"
    >
      <RiImageFill />
    </button>
  )
}

export default ImageButton
