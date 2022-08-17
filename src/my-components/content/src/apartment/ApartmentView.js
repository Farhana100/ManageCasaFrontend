import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../static/css/apartment.css'
import Button from '../../../misc/Button';



function CarouselIndicators ({array}) {
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
  const inners = array.map(
    (item, index) => {
      if (index) {
        return <div className="carousel-item apartment-image"><img className="d-block w-100" src={'http://127.0.0.1:8000' + item} alt={item}/></div>
      }
      else {
        return <div className="carousel-item apartment-image active"><img className="d-block w-100" src={'http://127.0.0.1:8000' + item} alt={item}/></div>
      }
    }
  );

  return (
    <>{inners}</>
  );
}

export default function ApartmentView({usertype}) {

  const {id} = useParams();
  console.log("usertype", usertype);

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
  
  return (
    <>
      <div className="container-fluid">
        <div className='container m-2'>
          <nav className='navbar'>
            <Link className='nav-item text-secondary' to='/apartments'>&lt; go back to all apartments</Link>
          </nav>
        </div>
        <div className="row">

{/* ------------------------------------------------------- apartment images start ---------------------------------------------------- */}
          <div className="col-8">
            <div id="apartmentImages" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <CarouselIndicators array={apartmentImages}/>
              </ol>
              <div className="carousel-inner">
                {/* <div className="carousel-item active">
                  <img className="d-block w-100" src={test_img} alt="First slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={test_img} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={test_img} alt="Third slide"/>
                </div> */}
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

              { apartmentData['apartment_rent'] !== 0 &&  <div className='row'>
                <div className='col'><strong>Rent: </strong></div>
                <div className='col'>{apartmentData['apartment_rent']}</div>
              </div>}
            </div>          
          </div>
{/* ----------------------------------------------------- apartment description end -------------------------------------------------*/}
        </div>
        <div className='row my-5'>
{/* ----------------------------------------------------- owner description start -------------------------------------------------*/}
          <div className='col-6 px-5'>

            { apartmentData['apartment_owner'] && 
              <div className="text-left">
                <p className='h4'>Owner:</p>
                <hr/> 

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
              </div>
            }
          </div>
{/* ----------------------------------------------------- owner description end ---------------------------------------------------*/}

{/* ----------------------------------------------------- tenant description start -------------------------------------------------*/}
          <div className='col-6 px-5'>
          
            
            { apartmentData['apartment_tenant'] && 
                <div className="text-left">
                  <p className='h4'>Tenant:</p>
                  <hr/> 

                  <img className="d-block w-50" src={'http://127.0.0.1:8000' + apartmentData['tenant_image']} alt={apartmentData['owner_name']}/>


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
                </div>
              }
          </div>
{/* ----------------------------------------------------- tenant description end ---------------------------------------------------*/}
        </div>
      </div>

      { usertype === 'admin' &&
        <div className='row m-5'>
          <div className='col-6 text-left'><Button text="Delete"/></div>
          <div className='col-6 text-right'><Button text="Edit"/></div>
        </div>
      }

      <div className='py-5 my-5'></div>

    </>
  )
}

