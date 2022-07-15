import React from 'react'
import '../css/tenants.css';

export default function Tenants (props) {
  return (
    <div className='tenants'>
       <div className='container'>
        <h3 className='tenant_head'>List of Tenants</h3>
        {props.tenants.map(tenant=> {
         return(
          <>
          <div className='grid-container'>
            <div className='grid-child-element'>
                <img className='image' src={require('../images/nahian.jpg')}/>
            </div>
            <div className='grid-child-element'>
              <div className='row'>
                <h5 className='tenant-title'>{tenant.name}</h5>
                <p className='tenant-text'> Apartment No. {tenant.floor}{tenant.unit}</p>
                <p className='mobile'>Mobile No. {tenant.phone_no}</p>
              </div>
            </div>
          </div>
          <hr/>
          </>
      )
        })}
        </div>
    </div>
  
  )
}
