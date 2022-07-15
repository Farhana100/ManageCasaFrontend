import React from 'react'
import '../css/tenants.css';

export const Tenant = (props) => {
  return (
    <div className='tenant'>
        <h5 className='tenant-title'>{props.tenant.name}</h5>
        <p className='tenant-text'> Apartment No. {props.tenant.floor}{props.tenant.unit}</p>
        <p>Mobile No. {props.tenant.phone_no}</p>
    </div>
  )
}
