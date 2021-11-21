import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Transforms } from 'slate'

export const withImages = (editor) => {
  const { isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  return editor
}

export const insertImage = (editor, url, alt) => {
  const text = { text: 'Image Caption' }
  const image = { type: 'image', url, alt, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const isImageUrl = (url) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
