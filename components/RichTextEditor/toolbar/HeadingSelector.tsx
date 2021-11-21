import React from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import {
  RiArrowDownSLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
} from 'react-icons/ri'
import { isBlockActive } from 'components/RichTextEditor/functions/blocks'
import BlockButton from './BlockButton'

const headingList = [
  {
    name: 'Heading 1',
    format: 'heading-one',
    icon: <RiH1 className="uk-margin-small-right" />,
  },
  {
    name: 'Heading 2',
    format: 'heading-two',
    icon: <RiH2 className="uk-margin-small-right" />,
  },
  {
    name: 'Heading 3',
    format: 'heading-three',
    icon: <RiH3 className="uk-margin-small-right" />,
  },
  {
    name: 'Heading 4',
    format: 'heading-four',
    icon: <RiH4 className="uk-margin-small-right" />,
  },
  {
    name: 'Heading 5',
    format: 'heading-five',
    icon: <RiH5 className="uk-margin-small-right" />,
  },
  {
    name: 'Heading 6',
    format: 'heading-six',
    icon: <RiH6 className="uk-margin-small-right" />,
  },
]

const Heading = () => {
  const editor = useSlate()

  let format = null
  for (const f of headingList) {
    if (isBlockActive(editor, f.format)) format = f
  }

  return (
    <>
      <button
        className={clsx(
          format && 'uk-button-primary',
          'uk-button uk-button-default uk-border uk-flex-inline uk-flex-middle',
        )}
        type="button"
      >
        <div className="uk-flex-inline uk-flex-middle">
          {format?.icon || <RiParagraph className="uk-margin-small-right" />}{' '}
          {format?.name || 'Paragraph'}
        </div>
        <RiArrowDownSLine className="uk-margin-small-left" />
      </button>

      <div data-uk-dropdown="pos:top-center; mode: click">
        <BlockButton
          className="uk-display-block uk-width-expand uk-border uk-flex uk-flex-middle uk-text-justify"
          format={'paragraph'}
          type="button"
        >
          <RiParagraph className="uk-margin-small-right" /> Paragraph
        </BlockButton>
        {headingList.map((list) => (
          <BlockButton
            className="uk-display-block uk-width-expand uk-border uk-flex uk-flex-middle uk-text-justify"
            format={list.format}
            type="button"
            key={list.format}
          >
            {list.icon} {list.name}
          </BlockButton>
        ))}
      </div>
    </>
  )
}

export default Heading
