import React from 'react'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PropTypes from 'prop-types'
import './navbar/navbar.css'
import Navlinks from './Navlinks'

 
function FilterContent ({navbar_content_array, page, access}) {

  const nav_items = navbar_content_array.map(
    (item) => {
      if (item.for & access) {
        return <Navlinks link={item.link} text={item.text} active={item.text.toLowerCase() === page.toLowerCase()}/>
      }
      return null;
    }
  );

  return (
    <>{nav_items}</>
  );
}

function NavbarContent ({navbar_content_array, page, userType}) {
  if (userType === "admin") {
      return <FilterContent navbar_content_array={navbar_content_array} page={page} access={1} />;
  }
  if (userType === "owner") {
      return <FilterContent navbar_content_array={navbar_content_array} page={page} access={2} />;
  }
  if (userType === "tenant") {
      return <FilterContent navbar_content_array={navbar_content_array} page={page} access={4} />;
  }
  return <FilterContent navbar_content_array={navbar_content_array} page={page} access={0}/>;
}

export default function Navbar({userType}) {
  let navbar_content = [
    { link:"/dashboard",      text:"Dashboard",         for: 0b111, },
    { link:"/apartments",     text:"Apartments",        for: 0b111, },
    { link:"/committee",      text:"Committee Members", for: 0b111, },
    { link:"/owners",         text:"Owners",            for: 0b111, },
    { link:"/tenants",        text:"Tenants",           for: 0b111, },
    { link:"#",               text:"Employees",         for: 0b111, },
    { link:"#",               text:"Service Providers", for: 0b111, },
    { link:"#",               text:"Forum",             for: 0b011, },
    { link:"#",               text:"Finance",           for: 0b011, },
    { link:"#",               text:"Complaints",        for: 0b011, },
    { link:"#",               text:"Dues",              for: 0b110, },
    { link:"#",               text:"Payment history",   for: 0b110, },
    { link:"#",               text:"Notice",            for: 0b111, },
    { link:"/election",       text:"Election",          for: 0b011, },
    { link:"#",               text:"Visitors",          for: 0b111, },
  ];

  // let admin_access = 0b111001111111111;
  // let owner_access = 0b111111111111111;
  // let tenat_access = 0b101110001111111;

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'dashboard' } userType={ userType }/></div>
        } />
        <Route path="/apartments" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'apartments' } userType={ userType }/></div>
        } />
        <Route path="/owners" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'owners' } userType={ userType }/></div>
        } />
        <Route path="/tenants" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'tenants' } userType={ userType }/></div>
        } />
        <Route path="/committee" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'Committee Members' } userType={ userType }/></div>
        }/>
        <Route path="/addcommittee" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'Committee Members' } userType={ userType }/></div>
        } />
        <Route path="/election" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'election' } userType={ userType }/></div>
        } />
        <Route path="/createelection" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'election' } userType={ userType }/></div>
        } />
        <Route path="/viewelection" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'election' } userType={ userType }/></div>
        } />
         <Route path="/descelection" exact element={
          <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } page={ 'election' } userType={ userType }/></div>
        } />
      </Routes>
    </Router>
  )
}

Navbar.defaultProps = {
  userType: null,
}

Navbar.propTypes = {
  userType: PropTypes.string,
}