import React from 'react'

const Link = ({ attributes, children, element }) => {
  return (
    <a {...attributes} href={element.url} title={element.url}>
      {children}
    </a>
  )
}

export default Link
