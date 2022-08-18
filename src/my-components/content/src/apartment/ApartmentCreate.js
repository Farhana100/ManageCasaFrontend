import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/apartment.css'

function readURL() {
    var image = document.getElementById("upload").files;

    if(image && image[0]){
        console.log("test", image[0]);
    }
}

export default function ApartmentCreate(){

    let user = JSON.parse(localStorage.getItem('data'));

    if (user.userType !== 'admin') {
        window.location.replace('/apartments');
    }

    const [ building, setBuilding ] = useState(user.building);
    const [ floor_number, setFloor_number ] = useState(0);
    const [ apartment_number, setApartment_number ] = useState(0);
    const [ rent, setRent ] =useState(0);
    const [ service_charge_due_amount, setService_charge_due_amount ] = useState(0);

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

    
    function createApartmentHandler(e){
        e.preventDefault();
        fetch("http://127.0.0.1:8000/createApartment", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                building: building,
                floor_number: floor_number,
                apartment_number: apartment_number,
                rent: rent,
                service_charge_due_amount: service_charge_due_amount
            })
          })
          .then(response => response.json())
          .then(data => {
            
            console.log(data.error);
            if(data.error){
                console.log(data.msg)
            }
            else {
                navigate('/apartments');
            }
          });
    }

    let navigate = useNavigate();


  return (
    <>
        
        <h4> Add New Apartment</h4>
        <hr/>
        <form className='container'>
            <div className="form-group">
                <label className='h6 bold'>Add Apartment Image</label>
                <div className="row py-4">
                    <div className="col-lg-6 mx-auto">

                        {/* <!-- Upload image input--> */}
                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input id="upload" type="file" onChange={readURL} className="form-control border-0"/>
                            <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">Choose file</label>
                            <div className="input-group-append">
                                <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                            </div>
                        </div>

                        {/* <!-- Uploaded image area--> */}
                        <div className="image-area mt-4"><img id="imageResult" src="#" alt="" className="img-fluid rounded shadow-sm mx-auto d-block"/></div>

                    </div>
                </div>
            </div>
            <div className="form-group">
                <label  className='h6 bold' htmlFor="floor_number">Floor no.</label>
                <input type="number" className="form-control" id="floor_number" aria-describedby="floor_numberHelp" onChange={handleFloor_numberChange}/>
                <small id="floor_numberHelp" className="form-text text-muted">Enter the apartment floor number</small>
            </div>
            <div className="form-group">
                <label  className='h6 bold' htmlFor="apartment_number">Floor no.</label>
                <input type="text" className="form-control" id="apartment_number" aria-describedby="apartment_numberHelp" placeholder='e.g.,1C' onChange={handleApartment_numberChange}/>
                <small id="apartment_numberHelp" className="form-text text-muted">Enter the apartment number</small>
            </div>
            <div className="form-group">
                <label  className='h6 bold' htmlFor="service_charge_due_amount">Due Service Charge Amount</label>
                <input type="number" className="form-control" id="service_charge_due_amount" aria-describedby="service_charge_due_amountHelp" placeholder='0' onChange={handleService_charge_due_amountChange}/>
            </div>
            <div className="form-group">
                <label className='h6 bold' htmlFor="rent">Apartment Rent</label>
                <input type="number" className="form-control" id="rent" aria-describedby="rentHelp" placeholder='0' onChange={handleRentChange}/>
            </div>
            
            <div className='row my-5'>
                <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={'/apartments'} /></div>
                <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={createApartmentHandler}/></div>
            </div>
        </form>
    </>
  )
}




