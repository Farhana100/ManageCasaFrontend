import React from 'react';
import logo from './brand/logo.svg';
import './brand/brand.css';

export default function Brand() {
  return (
    <div className='brand-test'>
      <div className='brand'>
        <img src={logo} className="App-logo" alt="ManageCasa logo" />
        <h5 className="mt-auto font-weight-normal">ManageCasa</h5>
      </div>
    </div>
  )
}
