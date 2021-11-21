import React from 'react'
import CodeBlock from './CodeBlock'
import Image from './Image'
import Link from './Link'
import Youtube from './Youtube'

const Elements = (props) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-four':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-five':
      return <h6 {...attributes}>{children}</h6>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'text-center':
      return (
        <p align="center" {...attributes}>
          {children}
        </p>
      )
    case 'text-right':
      return (
        <p align="right" {...attributes}>
          {children}
        </p>
      )
    case 'text-justify':
      return (
        <p align="justify" {...attributes}>
          {children}
        </p>
      )
    case 'image':
      return <Image {...props} alt="" />
    case 'youtube':
      return <Youtube {...props} />
    case 'link':
      return <Link {...props} />
    case 'size':
      return (
        <span style={{ fontSize: Number(element.value) }} {...attributes}>
          {children}
        </span>
      )
    case 'color':
      return (
        <span style={{ color: element.value }} {...attributes}>
          {children}
        </span>
      )
    case 'code-block':
      return (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Elements
