import React, { Component } from 'react'

export default function ElectionNavbar(props){
    return(
        <nav className="elec-navbar navbar navbar-expand-lg navbar-light bg-light">
            <a className="nav-item nav-link elec" href="/election">Committee Election</a>
            <a className="nav-item nav-link poll" href="/election/poll">Poll</a>
        </nav>
    )
}