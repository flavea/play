import { Editor, Range, Path, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { unwrap } from './inlines'

export const createParagraphNode = (children = [{ text: '' }]) => ({
  type: 'paragraph',
  children,
})

const createLinkNode = (href, text) => ({
  type: 'link',
  href,
  children: [{ text }],
})

export const wrapLink = (editor, url: string, text: string = 'New Link') => {
  if (!url) return

  const { selection } = editor
  const link = createLinkNode(url, text)

  ReactEditor.focus(editor)

  if (selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus?.path,
    )

    if (parentNode.type === 'link') {
      unwrap(editor, 'link')
    }

    if (editor.isVoid(parentNode)) {
      Transforms.insertNodes(editor, createParagraphNode([link]), {
        at: Path.next(parentPath),
        select: true,
      })
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true })
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }
  } else {
    Transforms.insertNodes(editor, createParagraphNode([link]))
  }
}
