import React from 'react'
import PropTypes from 'prop-types'

export default function Button({link, text, style, OnClick}) {
  function handleClick(e) {
    e.preventDefault();
    // alert(`${this.state.designation}`);
  }

  return (
    <a className={`btn mx-3 ${style}`} onClick={OnClick} href={link}>{text}</a>
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
