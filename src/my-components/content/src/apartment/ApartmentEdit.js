import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/apartment.css'

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
  

export default function ApartmentEdit(){
    let user = JSON.parse(localStorage.getItem('data'));

    if (!user) {
        window.location.replace('/login');
    }

    if (!user.user_active) {
        window.location.replace('/login');
    }

    if (user.userType !== 'admin') {
        window.location.replace('/dashboard');
    }

    const {id} = useParams();

    const [ building, setBuilding ] = useState(user.building);
    const [ floor_number, setFloor_number ] = useState(0);
    const [ apartment_number, setApartment_number ] = useState(0);
    const [ rent, setRent ] =useState(0);
    const [ service_charge_due_amount, setService_charge_due_amount ] = useState(0);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ imageFiles, setImageFiles ] = useState([]);
    const [ tenant, setTenant ] = useState("");
    const [ owner, setOwner ] = useState("");

    const [ apartmentData, setApartmentData ] = useState({});
    const [ apartmentImages, setApartmentImages] = useState([]);
    
    const handleFloor_numberChange = (e) => {
        setFloor_number(e.target.value);
        console.log(floor_number);
    }

    const handleApartment_numberChange = (e) => {
        setApartment_number(e.target.value);
        console.log(apartment_number);
    }

    const handleRentChange = (e) => {
        setRent(e.target.value);
        console.log(rent);
    }

    const handleService_charge_due_amountChange = (e) => {
        setService_charge_due_amount(e.target.value);
        console.log(service_charge_due_amount);
    }

    const handleDeleteOwner = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/deleteOwner", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                pk:apartmentData['apartment_owner']
            })
          })
          .then(response => response.json())
          .then(data => {
            
            console.log(data.error);
            if(data.error){
                console.log(data.msg)
            }
            else {
                navigate('/owners');
            }
          });
    }

    const handleDeleteTenant = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/deleteTenant", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                pk:apartmentData['apartment_tenant']
            })
          })
          .then(response => response.json())
          .then(data => {
            
            console.log(data.error);
            if(data.error){
                console.log(data.msg)
            }
            else {
                navigate('/tenants');
            }
          });
    }

    const handleImageChange = (e) => {
      
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        const imagesArray = Array.from(e.target.files).map((file) => file);
  
        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        setImageFiles((prevImages) => prevImages.concat(imagesArray));
  
      }
    };
  
    const renderPhotos = (source) => {
      console.log('source: ', source);
      return source.map((photo) => {
        return <img className='col-4 img-fluid shadow-sm d-block' src={photo} alt="" key={photo} />;
      });
    };

    function fetchApartment(){
        fetch(`http://127.0.0.1:8000/getApartment/${id}`)
        .then(response => response.json())
        .then((data) => {
            console.log('data ', data);
            if(data){
                setFloor_number(data.apartment_floor_number);
                setApartment_number(data.apartment_number);
                setRent(data.apartment_rent);
                setService_charge_due_amount(data.service_charge_due_amount);
                setSelectedFiles(data.apartment_images);

                setApartmentData(data);
                setApartmentImages(data.apartment_images);
            }
            else {
                console.log("smth is wrong in th backend");
            }
        });
    }
  
    useEffect(() => {
      fetchApartment();    
    }, []);

    
    async function updateApartmentHandler(e){
      e.preventDefault();

      let formData = new FormData();

      formData.append('pk', id);
      formData.append('building', building);
      formData.append('floor_number', floor_number);
      formData.append('apartment_number', apartment_number);
      formData.append('rent', rent);
      formData.append('service_charge_due_amount', service_charge_due_amount);


      formData.append('images_count', imageFiles.length);
      Array.from(imageFiles).map(
          (file, key) => formData.append('img_' + key, file) // avoid memory leak
      );


      await axios({
          method: 'post', 
          url: "http://127.0.0.1:8000/updateApartment",
          data: formData
      })
      .then(response => {
        console.log(response.data.error);
        if(response.data.error){
            console.log(response.data.msg)
        }
        else {
            navigate(`/apartments/${id}`);
        }
      });
    }


    let navigate = useNavigate();


  return (
    <>
        <h4> Edit Apartment</h4>
        <hr/>
        <div className='container-fluid pl-0'>
            <div className='row'>
                <div className='col-7'>
                    <form>
                        <div className="form-group">
                            <label className='h6 bold'>Apartment Image</label>
                            <div className="py-4">
                                <div className=" mx-auto">
                                    {/* <!-- Upload image input--> */}
                                    <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                                        <input type="file" id="file" multiple onChange={handleImageChange}  className="form-control border-0" />
                                        <label id="file-label" htmlFor="file" className="font-weight-light text-muted">Choose file</label>
                                        
                                        <div className="input-group-append">
                                            <label htmlFor="file" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Uploaded image area--> */}
                            <div className='container-fluid p-0'><div className="result image-area mt-4 row">{renderPhotos(selectedFiles)}</div></div>
                            
                        </div>
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="floor_number">New Floor no.</label>
                            <input type="number" className="form-control" id="floor_number" aria-describedby="floor_numberHelp" value={floor_number} onChange={handleFloor_numberChange} required/>
                            <small id="floor_numberHelp" className="form-text text-muted">Enter the apartment floor number</small>
                        </div>
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="apartment_number">New Apartment no.</label>
                            <input type="text" className="form-control" id="apartment_number" aria-describedby="apartment_numberHelp" value={apartment_number} onChange={handleApartment_numberChange} required/>
                            <small id="apartment_numberHelp" className="form-text text-muted">Enter the apartment number</small>
                        </div>
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="service_charge_due_amount">New Due Service Charge Amount</label>
                            <input type="number" className="form-control" id="service_charge_due_amount" aria-describedby="service_charge_due_amountHelp" value={service_charge_due_amount} onChange={handleService_charge_due_amountChange} required/>
                        </div>
                        <div className="form-group">
                            <label className='h6 bold' htmlFor="rent">New Apartment Rent</label>
                            <input type="number" className="form-control" id="rent" aria-describedby="rentHelp" value={rent} onChange={handleRentChange} required/>
                        </div>
                        
                        <div className='form-group row my-5'>
                            <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={`/apartments/${id}`} /></div>
                            <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={updateApartmentHandler}/></div>
                        </div>
                    </form>
                </div>
                <div className='col-5 app-info-summary rounded p-4'>
                        
{/* ----------------------------------------------------- apartment description start -------------------------------------------------*/}
                    <div className="text-left">
                        <p className='h4'>Current Information:</p>
                        <hr/>
                        <div className='container-fluid mt-5 pl-0'>
                            <div className='row'>
                                <div className='col'><strong>Floor number: </strong></div>
                                <div className='col'>{apartmentData['apartment_floor_number']}</div>
                            </div>
                            <div className='row'>
                                <div className='col'><strong>Apartment number: </strong></div>
                                <div className='col'>{apartmentData['apartment_number']}</div>
                            </div>
                            {rent !== 0 &&
                                <div className='row'>
                                    <div className='col'><strong>Rent: </strong></div>
                                    <div className='col'>{apartmentData['rent']}</div>
                                </div>
                            }
{/* ----------------------------------------------------- owner description start -------------------------------------------------*/}
                            <div className='my-5'>
                                <div className="text-left">
                                    <div className='row'>
                                        <div className='col d-flex justify-content-start'><p className='h4'>Owner:</p></div>
                                        <div className='col d-flex justify-content-end'>
                                            {apartmentData['apartment_owner'] && apartmentData['apartment_owner'] !== 'None' && user.userType === 'admin' && 
                                            <Button text={'Remove Owner'} OnClick={handleDeleteOwner}/>}
                                        </div>
                                    </div>
                                    <hr/> 
                                    <ApartmentOwner usertype={user.userType} apartmentData={apartmentData}/>      
                                </div>
                            </div>
{/* ----------------------------------------------------- owner description end ---------------------------------------------------*/}

{/* ----------------------------------------------------- tenant description start -------------------------------------------------*/}
                            <div className='my-5'>
                                <div className="text-left">
                                    <div className='row'>
                                        <div className='col d-flex justify-content-start'><p className='h4'>Tenant:</p></div>
                                        <div className='col d-flex justify-content-end'>
                                            {apartmentData['apartment_tenant'] && apartmentData['apartment_tenant'] !== 'None' && user.userType === 'admin' && 
                                            <Button text={'Remove Tenant'} OnClick={handleDeleteTenant} />}
                                        </div>
                                    </div>
                                    <hr/> 
                                    <ApartmentTenant usertype={user.userType} apartmentData={apartmentData}/>   
                                </div>
                            </div>
{/* ----------------------------------------------------- tenant description end ---------------------------------------------------*/}
                            
                        </div>
                    </div>
{/* ----------------------------------------------------- apartment description end -------------------------------------------------*/}
                </div>
            </div>
        </div>
        
          
    </>
  )
}




