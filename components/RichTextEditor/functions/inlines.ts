import isUrl from 'is-url'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { wrapLink } from './links'

export const withInlines = (editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) =>
    ['link', 'color', 'size'].includes(element.type) || isInline(element)

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const isInlineActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })
  return match
}

export const wrap = (editor, value: string, format) => {
  if (isInlineActive(editor, format)) {
    unwrap(editor, format)
  }

  const { selection } = editor
  if (!selection) return

  const item = {
    type: format,
    value,
    children: [{ text: value }],
  }

  Transforms.wrapNodes(editor, item, { split: true })
}

export const unwrap = (editor, type) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
  })
}
