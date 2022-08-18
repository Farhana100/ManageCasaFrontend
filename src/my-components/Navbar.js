import React from 'react'
import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
import './navbar/navbar.css'

 
function FilterContent ({navbar_content_array, access}) {

  const nav_items = navbar_content_array.map(
    (item) => {
      if (item.for & access) {
        return <NavLink className={'nav-link my-navlink'} to={item.link}>{item.text}</NavLink>
      }
      return null;
    }
  );

  return (
    <>{nav_items}</>
  );
}

function NavbarContent ({navbar_content_array, userType}) {
  if (userType === "admin") {
      return <FilterContent navbar_content_array={navbar_content_array} access={1} />;
  }
  if (userType === "owner") {
      return <FilterContent navbar_content_array={navbar_content_array} access={2} />;
  }
  if (userType === "tenant") {
      return <FilterContent navbar_content_array={navbar_content_array} access={4} />;
  }
  return <FilterContent navbar_content_array={navbar_content_array} access={0}/>;
}

export default function Navbar({userType}) {
  let navbar_content = [
    { link:"/dashboard",      text:"Dashboard",         for: 0b111, },
    { link:"/apartments",     text:"Apartments",        for: 0b111, },
    { link:"/committee",      text:"Committee Members", for: 0b111, },
    { link:"/owners",         text:"Owners",            for: 0b111, },
    { link:"/tenants",        text:"Tenants",           for: 0b111, },
    // { link:"/employees",      text:"Employees",         for: 0b111, },
    { link:"/election",       text:"Election",          for: 0b011, },
    { link:"/service",        text:"Service Providers", for: 0b111, },
    // { link:"/forum",          text:"Forum",             for: 0b011, },
    { link:"/finance",        text:"Finance",           for: 0b011, },
    // { link:"/complaints",     text:"Complaints",        for: 0b011, },
    { link:"/dues",           text:"Dues",              for: 0b110, },
    { link:"/paymenthistory", text:"Payment history",   for: 0b110, },
    // { link:"/notice",         text:"Notice",            for: 0b111, },
    
    // { link:"/visitors",       text:"Visitors",          for: 0b111, },
  ];

  // let admin_access = 0b111001111111111;
  // let owner_access = 0b111111111111111;
  // let tenat_access = 0b101110001111111;

  return (
    <>
      <nav>
        <div className='my-navbar'><NavbarContent navbar_content_array={ navbar_content } userType={ userType }/></div>
      </nav>
    </>
  )
}

Navbar.defaultProps = {
  userType: null
}

Navbar.propTypes = {
  userType: PropTypes.string
}