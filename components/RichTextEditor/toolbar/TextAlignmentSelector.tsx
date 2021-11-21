import React from 'react'
import { useSlate } from 'slate-react'
import clsx from 'clsx'
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowDownSLine,
} from 'react-icons/ri'
import { isBlockActive } from 'components/RichTextEditor/functions/blocks'
import BlockButton from './BlockButton'

const alignmentList = [
  {
    name: 'Center',
    format: 'text-center',
    icon: <RiAlignCenter className="uk-margin-small-right" />,
  },
  {
    name: 'Right',
    format: 'text-right',
    icon: <RiAlignRight className="uk-margin-small-right" />,
  },
  {
    name: 'Justify',
    format: 'text-justify',
    icon: <RiAlignJustify className="uk-margin-small-right" />,
  },
]

const Alignment = () => {
  const editor = useSlate()

  let format = null
  for (const f of alignmentList) {
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
          {format?.icon || <RiAlignLeft className="uk-margin-small-right" />}{' '}
          {format?.name || 'Text Align'}
        </div>
        <RiArrowDownSLine className="uk-margin-small-left" />
      </button>

      <div data-uk-dropdown="pos:top-center; mode: click">
        {alignmentList.map((list) => (
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

export default Alignment
