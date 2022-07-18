import React, { Component } from 'react'

export default function ElectionNavbar(props){
    return(
        <nav class="elec-navbar navbar navbar-expand-lg navbar-light bg-light">
            <a class="nav-item nav-link elec" href="/election">Election</a>
            {/* <a class="nav-item nav-link poll" href="#">Poll</a> */}
        </nav>
    )
}