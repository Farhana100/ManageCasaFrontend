import React from 'react'
import PropTypes from 'prop-types'
import './navbar/navlinks.css'

export default function Navlinks({link, text, active}) {
  return (
    <div>
      <a className={`nav-link my-navlink ${active ? "active" : ""}`} href={ link }>{ text }</a>
    </div>
  )
}


Navlinks.defaultProps = {
  link: '#',  // replace default by home
  text: 'default text',
  active: false,
}

Navlinks.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
}