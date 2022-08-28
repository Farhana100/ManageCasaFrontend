import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
// import noneImage from '../../static/images/noneImage.png'
import noImg from '../../static/images/noneImage.png'
import { useParams } from 'react-router-dom';
import '../../static/css/apartment.css'
import Button from '../../../misc/Button';



function CarouselIndicators ({array}) {
  if(array.length === 0) {
    return (
      <li data-target="#apartmentImages" data-slide-to={0} className='active'></li>
    );
  }

  const indicators = array.map(
    (item, index) => {
      if (index) {
        return <li data-target="#apartmentImages" data-slide-to={index}></li>
      }
      else {
        return <li data-target="#apartmentImages" data-slide-to={index} className='active'></li>
      }
    }
  );

  return (
    <>{indicators}</>
  );
}

function CarouselInners ({array}) {
  if(array.length === 0) {
    return (
    <div className="carousel-item active"><img className="d-block apartment-image" src={noImg} alt={[]}/></div>
    );
  }

  const inners = array.map(
    (item, index) => {
      if (index) {
        return <div className="carousel-item"><img className="d-block apartment-image" src={'http://127.0.0.1:8000' + item} alt={item}/></div>
      }
      else {
        return <div className="carousel-item active"><img className="d-block apartment-image" src={'http://127.0.0.1:8000' + item} alt={item}/></div>
      }
    }
  );

  return (
    <>{inners}</>
  );
}

function ApartmentOwner({usertype, apartmentData}){
  if(apartmentData['apartment_owner']) {
    return (
      <>
        <img className="d-block w-50" src={'http://127.0.0.1:8000' + apartmentData['owner_image']} alt={apartmentData['owner_name']}/>

        <div className='container-fluid mt-5 pl-0'>
          <div className='row'>
            <div className='col'><strong>Name: </strong></div>
            <div className='col'>{apartmentData['owner_name']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Contact number: </strong></div>
            <div className='col'>{apartmentData['owner_phone_number']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Bkash number: </strong></div>
            <div className='col'>{apartmentData['owner_bkash_acc_number']}</div>
          </div>
        </div>    
      </>
    );
  }
  else {
    if(usertype === 'admin') {
      return (<>
        <Button text={'Add Owner'} link={'/owners/add'}/>
      </>);
    }
    else {
      return (<>
        <p className='h4'>This apartment has no owner</p>
      </>);
    }
  }
}

function ApartmentTenant({usertype, apartmentData}){
  if(apartmentData['apartment_tenant']) {
    return (
      <>
        <img className="d-block w-50" src={'http://127.0.0.1:8000' + apartmentData['tenant_image']} alt={apartmentData['tenant_name']}/>

        <div className='container-fluid mt-5 pl-0'>
          <div className='row'>
            <div className='col'><strong>Name: </strong></div>
            <div className='col'>{apartmentData['tenant_name']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Contact number: </strong></div>
            <div className='col'>{apartmentData['tenant_phone_number']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Bkash number: </strong></div>
            <div className='col'>{apartmentData['tenant_bkash_acc_number']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Arrival date: </strong></div>
            <div className='col'>{apartmentData['tenant_arrival_date']}</div>
          </div>
          <div className='row'>
            <div className='col'><strong>Departure date: </strong></div>
            <div className='col'>{apartmentData['tenant_departure_date']}</div>
          </div>
        </div>  
      </>
    );
  }
  else {
    if(usertype === 'admin') {
      return (<>
        <Button text={'Add Tenant'} link={'/tenants/add'}/>
      </>);
    }
    else {
      return (<>
        <p className='h4'>This apartment has no tenant</p>
      </>);
    }
  }
}


export default function ApartmentView() {

  let user = JSON.parse(localStorage.getItem('data'));

  if (!user) {
    window.location.replace('/login');
  }

  if (!user.user_active) {
      window.location.replace('/login');
  }

  const {id} = useParams();

  const [ apartmentData, setApartmentData ] = useState({});
  const [ apartmentImages, setApartmentImages] = useState([]);

  function fetchApartment(){
      fetch(`http://127.0.0.1:8000/getApartment/${id}`)
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          if(!data.msg){
            setApartmentData(data);
            setApartmentImages(data.apartment_images);
          }
      });
  }

  useEffect(() => {
    fetchApartment();    
  }, []);

  
  function handleApartmentDelete(e){
    e.preventDefault();
    fetch("http://127.0.0.1:8000/deleteApartment", {
        method: 'POST',
        headers: {
        'Content-type':'application/json',
        },
        body: JSON.stringify({
            apartment_pk: apartmentData['apartment_pk'],
        })
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        if(data.success){
            navigate('/apartments');
        }
        else {
            console.log(data.msg);
        }
    });
  }

  let navigate = useNavigate();
  
  return (
    <>
      <div className="container-fluid">
        <div className='container m-2'>
          <nav className='navbar'>
            <Link className='nav-item  text-primary text-decoration-none' to='/apartments'>&lt; go back to all apartments</Link>
          </nav>
        </div>
        <hr/>
        <div className="row">

{/* ------------------------------------------------------- apartment images start ---------------------------------------------------- */}
          <div className="col-8">
            <div id="apartmentImages" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <CarouselIndicators array={apartmentImages}/>
              </ol>
              <div className="carousel-inner">
                <CarouselInners array={apartmentImages}/>
              </div>
              <a className="carousel-control-prev" href="#apartmentImages" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#apartmentImages" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            
          </div>
{/* -------------------------------------------------------- apartment images end ---------------------------------------------------- */}


{/* ----------------------------------------------------- apartment description start -------------------------------------------------*/}
          <div className="col-4 text-left">
            <p className='h4'>{apartmentData['apartment_number']}</p>
            <hr/>
            <div className='container-fluid mt-5 pl-0'>
              <div className='row'>
                <div className='col'><strong>Building Address: </strong></div>
                <div className='col'>{apartmentData['apartment_building_address']}</div>
              </div>
              <div className='row'>
                <div className='col'><strong>Floor number: </strong></div>
                <div className='col'>{apartmentData['apartment_floor_number']}</div>
              </div>

              { apartmentData['apartment_rent'] !== 0 &&  
                <div className='row'>
                  <div className='col'><strong>Rent: </strong></div>
                  <div className='col'>{apartmentData['apartment_rent']}</div>
                </div>
              }
            </div>          
          </div>
{/* ----------------------------------------------------- apartment description end -------------------------------------------------*/}
        </div>
        <div className='row my-5'>
{/* ----------------------------------------------------- owner description start -------------------------------------------------*/}
          <div className='col-6 px-5'>
            
            <div className="text-left">
              <p className='h4'>Owner:</p>
              <hr/> 
              <ApartmentOwner usertype={user.userType} apartmentData={apartmentData}/>      
            </div>
          </div>
{/* ----------------------------------------------------- owner description end ---------------------------------------------------*/}

{/* ----------------------------------------------------- tenant description start -------------------------------------------------*/}
          <div className='col-6 px-5'>
              <div className="text-left">
                <p className='h4'>Tenant:</p>
                <hr/> 
                <ApartmentTenant usertype={user.userType} apartmentData={apartmentData}/>   
              </div>
          </div>
{/* ----------------------------------------------------- tenant description end ---------------------------------------------------*/}
        </div>
      </div>
      { user.userType === 'admin' &&
        <>
        <hr/>
        <div className='row m-5 py-5'>
          <div className='col-6 text-left' ><Button text="Delete Apartment" OnClick={handleApartmentDelete}/></div>
          <div className='col-6 text-right'><Button text="Edit Apartment" link={`/apartments/edit/${id}`}/></div>
        </div>
        </>
      }

      <div className='py-5 my-5'></div>

    </>
  )
}

