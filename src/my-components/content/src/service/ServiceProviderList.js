import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import '../../static/css/serviceProviders.css'
import Button from '../../../misc/Button';

export default function ServiceProviderList() {
  
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
  window.location.replace('/login');
  }
  
  if (! user.user_active) {
  window.location.replace('/login');
  }

  const [serviceProvidersData, setServiceProvidersData ] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched ] = useState(false);

  function fetchServiceProviders(){
    fetch(`http://127.0.0.1:8000/getAllServiceProviders/${user.building}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        if(data.success){
            setServiceProvidersData(data.data);
            setDataFetched(true);
        }
    });
  }

  
  useEffect(() => {
    fetchServiceProviders();
    setIsLoading(false);  
    console.log(serviceProvidersData);  
  }, []);


  
  const handleServiceProviderView = (e) => {
    // not sure how to implement
    navigate('/service');
  }

  let navigate = useNavigate();
  

  return (
    <>
    {
    !isLoading && datafetched
    ?
    <div className='serviceProviders'>
        {user.userType === 'admin' && 
            <div className='d-flex flex-row-reverse m-3'>
                <Button text={'add new'} link={'/service/add'}/>
            </div>
        }
       <div className='container mycontainer'>
        <h3 className='tenant-head'>List of All Service Providers</h3>
        {serviceProvidersData.map(serviceProvider=> {
         return(
          <>
          <div className='grid-container'>
            <div className='grid-child-element'>
            <img className="serviceProviderimage" src={'http://127.0.0.1:8000' + serviceProvider.image} />
            </div>
            <div className='grid-child-element'>
              <div className='row myrow'>
                <h5 className='serviceProvider-title'>{serviceProvider.company_name}</h5>
                <p className='serviceProvider-text'> Website Link: {serviceProvider.website}</p>
                <p className='serviceProvider-text'> Service Address: {serviceProvider.address}</p>
                <p className='mobile'>Mobile No. {serviceProvider.phone_number}</p>
                <p className='serviceProvider-text'> Bkash No. {serviceProvider.bkash_account_no}</p>
              </div>
            </div>
            <Button text={'view'} link={`/service/${serviceProvider.id}`}/>
          </div>
          <hr/>
          </>
        )
        })}
        </div>
    </div>
    :
    <>loading</>
    }
    </>
  )
}

