import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/serviceProviders.css'
  
export default function ServiceProviderEdit(){

    let navigate = useNavigate();
    
    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
    window.location.replace('/login');
    }
    
    if (! user.user_active) {
    window.location.replace('/login');
    }

    if (user.userType !== 'admin') {
        window.location.replace('/dashboard');
    }

    
    let errorMsg = {
        password:"",
        username:""
    }

    const {id} = useParams();

    const [ serviceProviderData, setServiceProviderData ] = useState({});
    const [ serviceProviderPackages, setServiceProviderPackages] = useState([]);
  
    
    const [ building, setBuilding ] = useState(user.building);
    const [ company_name, setCompany_name ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ currentImage, setCurrentImage ] = useState(null);
    const [ image, setImage ] = useState(null);
    const [ details, setDetails ] = useState("");
    const [ website, setWebsite ] = useState("");
    const [ phone_number, setPhone_number ] = useState(0);
    const [ bkash_acc_number, setBkash_acc_number ] = useState(0);
    const [ selectedFile, setSelectedFile ] = useState(null);   // temporary

    const handleCompany_nameChange = (e) => {
        setCompany_name(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleDetailsChange = (e) => {
        setDetails(e.target.value);
    }

    const handleWebsiteChange = (e) => {
        setWebsite(e.target.value);
    }

    const handlePhoneNumberChange = (e) => {
        setPhone_number(e.target.value);
    }

    const handleBkashNumberChange = (e) => {
        setBkash_acc_number(e.target.value);
    }

	const handleImageChange = (e) => {
		if (e.target.files) {
            setImage(e.target.files[0]);
			setSelectedFile(URL.createObjectURL(e.target.files[0]));
		}
	};

	const renderPhotos = (source) => {
        return <img className='col-4 img-fluid shadow-sm d-block' src={source} alt="" key={source} />;
	};

    function fetchServiceProvider(){
        fetch(`http://127.0.0.1:8000/getServiceProvider/${id}/${user.uid}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if(data.success){
                setServiceProviderData(data);
                setCompany_name(data.company_name);
                setAddress(data.address);
                setBkash_acc_number(data.bkash_acc_number);
                setDetails(data.details);
                setCurrentImage(data.image);
                setPhone_number(data.phone_number);
                setWebsite(data.website);
            }
            else{
              navigate('/notFound')
            }
        });
    }
  
    useEffect(() => {
      fetchServiceProvider();    
    }, []);
  
    
    async function editServiceProviderHandler(e){
        e.preventDefault();

        let formData = new FormData();

        formData.append('building', building);
        formData.append('pk', id);
        formData.append('company_name', company_name);
        formData.append('address', address);
        formData.append('image', image);
        formData.append('details', details);
        formData.append('website', website);
        formData.append('phone_number', phone_number);
        formData.append('bkash_acc_number', bkash_acc_number);

        await axios({
            method: 'post', 
            url: "http://127.0.0.1:8000/editServiceProvider",
            data: formData
        })
        .then(response => {
            if(response.data.success){
                navigate(`/service/${id}`);
            }
            else {
                console.log(response.data.msg);
                errorMsg[response.data.error] = response.data.msg;
            }
        });
    }

  return (
    <>
        
    <h4> Add New Service Provider</h4>
    <hr/>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-7'>
                <form className='container'>
                    <div className="form-group">
                        <label className='h6 bold'>Current Service Provider's Image:</label>
                        <div className='container aling-center my-5'><img className='col-4 img-fluid shadow-sm d-block' src={"http://127.0.0.1:8000" + currentImage}/></div>
                        <label className='h6 bold'>Add Service Provider's Image:</label>
                        <div className="row py-4">
                            <div className="col-lg-6 mx-auto">
                                {/* <!-- Upload image input can upload only one image--> */}
                                <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                                    <input type="file" id="file" onChange={handleImageChange}  className="form-control border-0" />
                                    <label id="file-label" htmlFor="file" className="font-weight-light text-muted">Choose file</label>
                                    
                                    <div className="input-group-append">
                                        <label htmlFor="file" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Uploaded image area--> */}
                        <div className='container-fluid p-0'><div className="result image-area mt-4 row">{renderPhotos(selectedFile)}</div></div>
                        
                    </div>
                    {/* company_name */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="company_name">Company Name: </label>
                        <input type="text" className="form-control" id="company_name" aria-describedby="company_nameHelp" value={company_name} onChange={handleCompany_nameChange}/>
                        <small id="company_nameHelp" className="form-text text-muted">{errorMsg['company_name']}</small>
                    </div>

                    {/* address */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="address">Address: </label>
                        <input type="text" className="form-control" id="address" aria-describedby="addressHelp" value={address} onChange={handleAddressChange}/>
                    </div>

                    {/* details */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="details">Service Details: </label>
                        <textarea type="textarea" className="form-control" id="details" aria-describedby="detailsHelp" value={details} onChange={handleDetailsChange}/>
                    </div>

                    {/* website */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="website">Company Website Link: </label>
                        <input type="link" className="form-control" id="website" aria-describedby="websiteHelp" value={website} onChange={handleWebsiteChange}/>
                    </div>

                    {/* phone number */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="phoneNumber">Phone Number: </label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={11} minLength={11} className="form-control" id="phoneNumber" aria-describedby="phoneNumberHelp" value={phone_number} onChange={handlePhoneNumberChange} required/>
                    </div>

                    {/* Bkash number */}
                    <div className="form-group">
                        <label  className='h6 bold' htmlFor="bkashNumber">Bkash Number: </label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={11} minLength={11} className="form-control" id="bkashNumber" aria-describedby="bkashNumberHelp" value={bkash_acc_number} onChange={handleBkashNumberChange} required/>
                    </div>
                    
                    <div className='form-group row my-5'>
                        <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={`/service/${id}`} /></div>
                        <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={editServiceProviderHandler}/></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}




