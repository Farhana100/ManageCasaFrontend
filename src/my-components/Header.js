import React from 'react'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brand from './Brand'
import PropTypes from 'prop-types'
import './header/header.css'

function handleLogout(e)
{
    e.preventDefault();
    localStorage.clear();
    window.location.replace('/home');
}

function ActiveUserHeader ({username}) {
    return (
        <>
            <li className="nav-item active">
                <a className="nav-link disabled px-3">Welcome, {username}</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href='#' onClick={handleLogout}>Log out</a>
            </li>
        </>
    )
}

function InactiveUserHeader () {
    return (
        <>
            <Router>
                <Routes>
                <Route path="/login" element={
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                } />
                <Route path="/register" element={
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Log in</a>
                    </li>
                } />
                <Route path="/home" element={
                    <>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Log in</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                    </>
                } />
                </Routes>
            </Router>
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
        <nav className="navbar navbar-expand-lg navbar-light my-header">
            <a className="navbar-brand" href={`${userActive ? "/dashboard" : "/home"}`}><Brand/></a>
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
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