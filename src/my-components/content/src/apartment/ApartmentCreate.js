import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/apartment.css'


export default function ApartmentCreate(){

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

    const [ building, setBuilding ] = useState(user.building);
    const [ floor_number, setFloor_number ] = useState(0);
    const [ apartment_number, setApartment_number ] = useState(0);
    const [ rent, setRent ] =useState(0);
    const [ service_charge_due_amount, setService_charge_due_amount ] = useState(0);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ imageFiles, setImageFiles ] = useState([]);

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

	const handleImageChange = (e) => {
		// console.log(e.target.files[])
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
			const imagesArray = Array.from(e.target.files).map((file) => file);

			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			setImageFiles((prevImages) => prevImages.concat(imagesArray));

			// Array.from(e.target.files).map(
			// 	(file) => URL.revokeObjectURL(file) // avoid memory leak
			// );
		}
	};

	const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return <img className='col-4 img-fluid shadow-sm d-block' src={photo} alt="" key={photo} />;
		});
	};

    async function createApartmentHandler(e){
        e.preventDefault();

        let formData = new FormData();

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
            url: "http://127.0.0.1:8000/createApartment",
            data: formData
        })
        .then(response => {
            console.log(response.data.error);
            if(response.data.error){
                console.log(response.data.msg)
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
        <form className='container-fluid'>
            <div className="form-group">
                <label className='h6 bold'>Add Apartment Image</label>
                <div className="row py-4">
                    <div className="col-lg-6 mx-auto">
                        {/* <!-- Upload image input--> */}
                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input type="file" id="file" multiple onChange={handleImageChange}  className="form-control border-0"  required/>
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
                <label  className='h6 bold' htmlFor="floor_number">Floor no.</label>
                <input type="number" className="form-control" id="floor_number" aria-describedby="floor_numberHelp" onChange={handleFloor_numberChange} required/>
                <small id="floor_numberHelp" className="form-text text-muted">Enter the apartment floor number</small>
            </div>
            <div className="form-group">
                <label  className='h6 bold' htmlFor="apartment_number">Apartment no.</label>
                <input type="text" className="form-control" id="apartment_number" aria-describedby="apartment_numberHelp" placeholder='e.g.,1C' onChange={handleApartment_numberChange} required/>
                <small id="apartment_numberHelp" className="form-text text-muted">Enter the apartment number</small>
            </div>
            <div className="form-group">
                <label  className='h6 bold' htmlFor="service_charge_due_amount">Due Service Charge Amount</label>
                <input type="number" className="form-control" id="service_charge_due_amount" aria-describedby="service_charge_due_amountHelp" placeholder='0' onChange={handleService_charge_due_amountChange} required/>
            </div>
            <div className="form-group">
                <label className='h6 bold' htmlFor="rent">Apartment Rent</label>
                <input type="number" className="form-control" id="rent" aria-describedby="rentHelp" placeholder='0' onChange={handleRentChange} required/>
            </div>
            
            <div className='form-group row my-5'>
                <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={'/apartments'} /></div>
                <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={createApartmentHandler}/></div>
            </div>
        </form>
    </>
  )
}




