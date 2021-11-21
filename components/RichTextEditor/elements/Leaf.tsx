import React from 'react'

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.code_block) {
    children = <pre>{children}</pre>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.sub) {
    children = <sub>{children}</sub>
  }

  if (leaf.sup) {
    children = <sup>{children}</sup>
  }

  if (leaf.strike) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
