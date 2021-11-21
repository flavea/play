import React from 'react'

const CodeBlock = ({ attributes, children, element }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}

export default CodeBlock
