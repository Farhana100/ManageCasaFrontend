import React, { Component } from 'react'
import '../static/css/tenants.css'
import { useEffect, useState } from 'react';

export default function Tenants(props) {
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    }
  }

  const [ tenantsData, setTenantsData ] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched ] = useState(false);

  function fetchTenants(){
    fetch(`http://127.0.0.1:8000/getAllTenants/${user.building}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        if(data.success){
          setTenantsData(data.data);
          setDataFetched(true);
        }
    });
}

  
  useEffect(() => {
    fetchTenants();
    setIsLoading(false);  
    console.log(tenantsData);  
  }, []);


  return (
    <>
    {
    !isLoading && datafetched
    ?
    <div className='tenants'>
       <div className='container mycontainer'>
        <h3 className='tenant-head'>List of Tenants</h3>
        {tenantsData.map(tenant=> {
         return(
          <>
          <div className='grid-container'>
            <div className='grid-child-element'>
            <img className="tenantimage" src={'http://127.0.0.1:8000' + tenant.image} />
            </div>
            <div className='grid-child-element'>
              <div className='row myrow'>
                <h5 className='tenant-title'>{tenant.tenant_name}</h5>
                <p className='tenant-text'> Apartment No. {tenant.floor_no}{tenant.unit_no}</p>
                <p className='mobile'>Mobile No. {tenant.phone_number}</p>
              </div>
            </div>
          </div>
          <hr/>
          </>
      )
        })}
        </div>
    </div>
    :
    null
    }
    </>
  )
}

