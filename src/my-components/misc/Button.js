import React from 'react'
import PropTypes from 'prop-types'

export default function Button({link, text, style}) {
  return (
    <a className={`btn mx-2 ${style}`} href={link}>{text}</a>
  )
}


Button.defaultProps = {
    link: '#',
    text: 'Button',
    style: 'mybutton',
}

Button.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.string,
}
