import React, { useEffect, useState } from 'react'
import '../../static/css/tenants.css'
import Button from '../../../misc/Button';

export default function TenantList(props) {
  
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
  window.location.replace('/login');
  }
  
  if (! user.user_active) {
  window.location.replace('/login');
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
        {user.userType === 'admin' && 
            <div className='d-flex flex-row-reverse m-3'>
                <Button text={'add new'} link={'/tenants/add'}/>
            </div>
        }
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
                <p className='tenant-text'> Floor No. {tenant.floor_no}</p>
                <p className='tenant-text'> Apartment No. {tenant.unit_no}</p>
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

