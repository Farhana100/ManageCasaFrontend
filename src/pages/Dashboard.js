import React from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from '../my-components/Navbar'

export default function Dashboard() {
  let user = JSON.parse(localStorage.getItem('data'));

  if (!user) {
      window.location.replace('/login');
  }

  if (!user.user_active) {
      window.location.replace('/login');
  }

  return (
    <div className='app-grid-container'>
        test
    </div>
  )
}
