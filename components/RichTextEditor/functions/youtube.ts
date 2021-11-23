import { Transforms } from 'slate'

export const withYoutube = (editor) => {
  const { isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'youtube' ? true : isVoid(element)
  }

  return editor
}

const youtubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export const insertYoutube = (editor, url) => {
  const text = { text: '' }
  let id = youtubeId(url)
  const link = `https://www.youtube.com/embed/${id}?autoplay=0&showinfo=0&rel=0&modestbranding=1`
  const youtube = { type: 'youtube', url: link, children: [text] }
  Transforms.insertNodes(editor, youtube)
}
