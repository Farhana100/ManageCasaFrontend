import React from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from '../my-components/Navbar'

export default function PrivateRoute() {
  let user = JSON.parse(localStorage.getItem('data'));

  if (!user) {
      window.location.replace('/login');
  }

  if (!user.user_active) {
      window.location.replace('/login');
  }

  return (
    <div className='app-grid-container'>
      <Navbar userType={user.userType}/>
      <div className='p-3'><Outlet /></div>
    </div>
  )
}
