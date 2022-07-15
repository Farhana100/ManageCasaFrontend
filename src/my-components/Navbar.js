import React from 'react'
import './navbar/navbar.css'
import Navlinks from './Navlinks'

export default function Navbar() {
  return (
    <div className='my-navbar'>
        <Navlinks />
        <Navlinks />
        <Navlinks active={true}/>
        <Navlinks />
        <Navlinks/>
    </div>
  )
}
