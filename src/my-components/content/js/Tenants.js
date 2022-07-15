import React from 'react'
import {Tenant} from './Tenant';
// import '../css/tenants.css';

export const Tenants = (props) => {
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
          <div className='grid-child-elemenr'>
          <div className='row'>
              <Tenant key={tenant.id} tenant={tenant}/>
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
