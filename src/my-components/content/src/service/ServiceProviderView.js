import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import '../../static/css/serviceProviders.css'
import Button from '../../../misc/Button';
import ServicePackage from './ServicePackage';




export default function ServiceProviderView() {

  let user = JSON.parse(localStorage.getItem('data'));

  const {id} = useParams();

  const [ serviceProviderData, setServiceProviderData ] = useState({});
  const [ serviceProviderPackages, setServiceProviderPackages] = useState([]);

  function fetchServiceProvider(){
      fetch(`http://127.0.0.1:8000/getServiceProvider/${id}/${user.uid}`)
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          if(data.success){
            setServiceProviderData(data);
            setServiceProviderPackages(data.packages);
          }
          else{
            navigate('/notFound')
          }
      });
  }

  useEffect(() => {
    fetchServiceProvider();    
  }, []);

  
  function handleServiceProviderDelete(e){
    e.preventDefault();
    fetch("http://127.0.0.1:8000/deleteServiceProvider", {
        method: 'POST',
        headers: {
        'Content-type':'application/json',
        },
        body: JSON.stringify({
            pk: id,
        })
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        if(data.success){
            navigate('/service');
        }
        else {
            console.log(data.msg);
        }
    });
  }

  let navigate = useNavigate();
    
  function Packages () {
    const packs = serviceProviderPackages.map(
        (item) => {
            return <div className="col-sm-3 mb-2"><ServicePackage pk={item['package_id']} service_provider_pk={id} user_pk={user.uid} title={item['title']} description={item['description']} fee={item['fee']} subscription_duration={item['duration']} canSubscribe={user.userType !== 'admin'} subscribed={item['subscribed']} userType={user.userType} /></div>
        }
      );

    return (
      <>{packs}</>
    );
  }
  
  return (
    <>
      <div className="container-fluid">
        <div className='container ml-0'>
          <nav className='navbar'>
            <Link className='nav-item text-primary text-decoration-none' to='/service'>&lt; go back to all Service Providers</Link>
          </nav>
        </div>
        <hr/>
        <div className='container-fluid mt-5 pl-0'>
          <div>
              <div><img className="service-provider-image align-bottom border shadow-sm p-3 mb-5 bg-white rounded" src={'http://127.0.0.1:8000' + serviceProviderData.image}/></div>
              <div><p className='h4 mt-5'>{serviceProviderData.company_name}</p></div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-2'><strong>Address: </strong></div>
            <div className='col'>{serviceProviderData.address}</div>
          </div>
          <div className='row'>
            <div className='col-2'><strong>Contact number: </strong></div>
            <div className='col'>{serviceProviderData.phone_number}</div>
          </div>
          <div className='row'>
            <div className='col-2'><strong>Bkash number: </strong></div>
            <div className='col'>{serviceProviderData.bkash_acc_number}</div>
          </div>
          <div className='row'>
            <div className='col-2'><strong>Official Website: </strong></div>
            <div className='col'><a target={'blank'} href={serviceProviderData.website}>{serviceProviderData.website}</a></div>
          </div>
          <div className='row'>
            <div className='container my-5'>
              <p className='lead'>{serviceProviderData.details}</p>
            </div>
          </div>
          <hr/>

        </div>  
        
        <div className='row my-5'>
        {/* ---------------------------------------- packages description start -------------------------------------------------*/}

        <div className='container'>
          <div className='row mb-5'>
            <div className='col text-left'><p className='h4'>Packages:</p></div>
            {user.userType === 'admin' && 
            <div className='col text-right'><Button text="Add Package" link={`/service/edit/${id}/addPackage`}/></div>
            }
          </div>
          <div className='row'>
            <Packages/>
          </div>
        </div>
          
        {/* -------------------------------------- packages description end ---------------------------------------------------*/}
        </div>
      </div>
      { user.userType === 'admin' &&
        <>
        <hr/>
        <div className='row m-5 py-5'>
          <div className='col-6 text-left' ><Button text="Delete Service Provider" OnClick={handleServiceProviderDelete}/></div>
          <div className='col-6 text-right'><Button text="Edit Service Provider Info" link={`/service/edit/${id}`}/></div>
        </div>
        </>
      }

      <div className='py-5 my-5'></div>

    </>
  )
}

