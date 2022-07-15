import React from 'react'
import Brand from './Brand'
import PropTypes from 'prop-types'
import './header/header.css'

function ActiveUserHeader ({username}) {
    return (
        <>
            <li class="nav-item active">
                <a class="nav-link disabled px-3">Welcome, {username}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{% url 'logout' %}">Log out</a>
            </li>
        </>
    )
}

function InactiveUserHeader () {
    return (
        <>
            <li class="nav-item">
                <a class="nav-link" href="{% url 'login' %}">Log in</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{% url 'register' %}">Register</a>
            </li>
        </>
    )
}

function HeaderContent ({username, userActive}) {
    if (userActive) {
        return <ActiveUserHeader username={username} />;
    }
    return <InactiveUserHeader />;
}

export default function Header({username, userActive}) {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light my-header">
            <a class="navbar-brand" href="{% url 'home' %}"><Brand/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <HeaderContent username={username} userActive={userActive} />
                </ul>
            </div>
        </nav>
        <div className='header-divider'></div>
    </div>
  )
}

Header.defaultProps = {
    username: null,
    userActive: false,
}

Header.propTypes = {
    username: PropTypes.string,
    userActive: PropTypes.bool,
}