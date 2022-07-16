import React from 'react'
import PropTypes from 'prop-types'
import './navbar/navbar.css'
import Navlinks from './Navlinks'

 
function FilterContent ({navbar_content_array, page, access}) {

  console.log(access);

  const nav_items = navbar_content_array.map(
    (item) => {
      if (item.for & access) {
        return <Navlinks link={item.link} text={item.text} active={item.text.toLowerCase() === page.toLowerCase()}/>
      }
      return null;
    }
  );

  console.log(nav_items)

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

export default function Navbar({userType, page}) {
  let navbar_content = [
    { link:"#", text:"Dashboard",         for: 0b111, },
    { link:"#", text:"Apartments",        for: 0b111, },
    { link:"#", text:"Committee Members", for: 0b111, },
    { link:"#", text:"Owners",            for: 0b111, },
    { link:"#", text:"Tenants",           for: 0b111, },
    { link:"#", text:"Employees",         for: 0b111, },
    { link:"#", text:"Service Providers", for: 0b111, },
    { link:"#", text:"Forum",             for: 0b011, },
    { link:"#", text:"Finance",           for: 0b011, },
    { link:"#", text:"Complaints",        for: 0b011, },
    { link:"#", text:"Dues",              for: 0b110, },
    { link:"#", text:"Payment history",   for: 0b110, },
    { link:"#", text:"Notice",            for: 0b111, },
    { link:"#", text:"Election",          for: 0b011, },
    { link:"#", text:"Visitors",          for: 0b111, },
  ];

  // let admin_access = 0b111001111111111;
  // let owner_access = 0b111111111111111;
  // let tenat_access = 0b101110001111111;

  console.log(0b000 & 0b111);
  console.log(userType);

  return (
    <div className='my-navbar'>
        <NavbarContent navbar_content_array={ navbar_content } page={ page } userType={ userType }/>
    </div>
  )
}

Navbar.defaultProps = {
  userType: null,
  page: null,
}

Navbar.propTypes = {
  userType: PropTypes.string,
  page: PropTypes.string,
}