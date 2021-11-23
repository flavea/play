import React, { useCallback, useEffect, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { Container } from './styled'
import { withHistory } from 'slate-history'
import {
  BlockButton,
  FontColorSelector,
  FontSizeSelector,
  HeadingSelector,
  ImageButton,
  LinkButton,
  MarkButton,
  TextAlignmentSelector,
  YoutubeButton,
} from './toolbar'
import Leaf from './elements/Leaf'
import Elements from './elements/Elements'
import { withImages } from './functions/images'
import { withInlines } from './functions/inlines'
import {
  RiBold,
  RiCodeFill,
  RiDoubleQuotesL,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiSubscript,
  RiSuperscript,
  RiStrikethrough,
  RiUnderline,
  RiCodeBoxFill,
} from 'react-icons/ri'
import { toggleMark } from './functions/marks'
import initialValues from './InitialValues'
import IF from 'components/If'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const RichTextEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValues)
  const [loaded, setLoaded] = useState(false)
  const renderElement = useCallback((props) => <Elements {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(
    () =>
      withInlines(
        withImages(withHistory(withReact(createEditor() as ReactEditor))),
      ),
    [],
  )

  useEffect(() => {
    if (localStorage) {
      const savedContent = localStorage.getItem('content')
      if (savedContent) setValue(JSON.parse(savedContent))
      else setValue(initialValues)
    }

    if (window) {
      window.onload = () => {
        console.log('onload')
        setLoaded(true)
      }
    }
  }, [])

  return (
    <section className="uk-flex uk-flex-center uk-flex-middle">
      <IF condition={!loaded}>
        <div data-uk-spinner="ratio: 3"></div>
      </IF>
      <IF condition={loaded}>
        <Container className="uk-container uk-container-large">
          <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
              setTimeout(() => {
                localStorage.setItem('content', JSON.stringify(value))
              }, 1000)
              setValue(value)
            }}
          >
            <div className="uk-margin-bottom uk-margin-top">
              <MarkButton format="bold" data-uk-tooltip="Bold">
                <RiBold />
              </MarkButton>
              <MarkButton format="italic" data-uk-tooltip="Italic">
                <RiItalic />
              </MarkButton>
              <MarkButton format="underline" data-uk-tooltip="Underline">
                <RiUnderline />
              </MarkButton>
              <MarkButton format="strike" data-uk-tooltip="Strikethrough">
                <RiStrikethrough />
              </MarkButton>
              <MarkButton format="sub" data-uk-tooltip="Subscript">
                <RiSubscript />
              </MarkButton>
              <MarkButton format="sup" data-uk-tooltip="Superscript">
                <RiSuperscript />
              </MarkButton>
              <MarkButton format="code" data-uk-tooltip="Code">
                <RiCodeFill />
              </MarkButton>
              <BlockButton
                format="code-block"
                data-uk-tooltip="Create a block of code"
              >
                <RiCodeBoxFill />
              </BlockButton>
              <FontSizeSelector />
              <FontColorSelector />
              <TextAlignmentSelector />
              <HeadingSelector />
              <LinkButton />
              <BlockButton format="blockquote" data-uk-tooltip="Block Quote">
                <RiDoubleQuotesL />
              </BlockButton>
              <BlockButton format="numbered-list" data-uk-tooltip="Number List">
                <RiListOrdered />
              </BlockButton>
              <BlockButton format="bulleted-list" data-uk-tooltip="Bullet List">
                <RiListUnordered />
              </BlockButton>
              <ImageButton />
              <YoutubeButton />
            </div>
            <Editable
              className="editor uk-padding uk-border-rounded"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                  }
                }
              }}
            />
          </Slate>
        </Container>
      </IF>
    </section>
  )
}

export default RichTextEditor
