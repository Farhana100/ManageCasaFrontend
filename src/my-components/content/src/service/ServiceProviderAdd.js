import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/serviceProviders.css'
  
export default function ServiceProviderAdd(){

    let user = JSON.parse(localStorage.getItem('data'));

    if (user.userType !== 'admin') {
        window.location.replace('/apartments');
    }

    let errorMsg = {
        password:"",
        username:""
    }
    
    const [ building, setBuilding ] = useState(user.building);
    const [ username, setUsername ] = useState("");
    const [ lastname, setLastname ] = useState("");
    const [ firstname, setFirstname ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phone_number, setPhone_number ] = useState(0);
    const [ bkash_acc_number, setBkash_acc_number ] = useState(0);
    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
        console.log(firstname);
    }

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
        console.log(lastname);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        console.log(e.target.value, password);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const handlePhoneNumberChange = (e) => {
        setPhone_number(e.target.value);
        console.log(phone_number);
    }

    const handleBkashNumberChange = (e) => {
        setBkash_acc_number(e.target.value);
        console.log(bkash_acc_number);
    }

	const handleImageChange = (e) => {
		// console.log(e.target.files[])
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

			// console.log("filesArray: ", filesArray);

			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		}
	};

	const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return <img className='col-4 img-fluid shadow-sm d-block' src={photo} alt="" key={photo} />;
		});
	};

    
    function createServiceProviderHandler(e){
        e.preventDefault();
        if(password !== "" && confirmPassword !== password){
            // console.log("password do not match");
            errorMsg['password'] = "password do not match";
        }
        else {
            
            fetch("http://127.0.0.1:8000/createServiceProvider", {
                method: 'POST',
                headers: {
                'Content-type':'application/json',
                },
                body: JSON.stringify({
                    
                    building: building,
                    username: username,
                    lastname: lastname,
                    firstname: firstname,
                    password: password,
                    email: email,
                    phone_number: phone_number,
                    bkash_acc_number: bkash_acc_number,
                    selectedFiles: selectedFiles,
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
                    errorMsg[data.error] = data.msg;
                    console.log('new test ', errorMsg['username']);
                }
            });
        }

    }

    let navigate = useNavigate();


  return (
    <>
        
        <h4> Add New Service Provider</h4>
        <hr/>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-7'>
                    <form className='container'>
                        <div className="form-group">
                            <label className='h6 bold'>Add Service Provider's Image</label>
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
                            <div className='container-fluid p-0'><div className="result image-area mt-4 row">{renderPhotos(selectedFiles)}</div></div>
                            
                        </div>
                        {/* user name */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="username">Username: </label>
                            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" onChange={handleUsernameChange}/>
                            <small id="usernameHelp" className="form-text text-muted">{errorMsg['username']}</small>
                        </div>

                        {/* first name */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="firstname">First Name: </label>
                            <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" onChange={handleFirstnameChange}/>
                            {/* {errorMsg.firstname !== "" && 
                                <small id="firstnameHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* last name */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="lastname">Last Name: </label>
                            <input type="text" className="form-control" id="lastname" aria-describedby="lastnameHelp" onChange={handleLastnameChange}/>
                            {/* {errorMsg.lastname !== "" && 
                                <small id="lastnameHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* password */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="password">Password: </label>
                            <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" onChange={handlePasswordChange}/>
                            {/* <small id="passwordHelp" className="form-text text-muted">this is a test</small> */}
                            <small id="passwordHelp" className="form-text text-muted">{errorMsg['password']}</small>
                        </div>

                        {/* confirm password */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="confirmPassword">Confirm Password: </label>
                            <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" onChange={handleConfirmPasswordChange}/>
                            {/* { errorMsg.password !== "" && 
                                <small id="confirmPasswordHelp" className="form-text text-muted">{errorMsg.password}</small>
                            } */}
                        </div>

                        {/* email */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="email">Email Address: </label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleEmailChange}/>
                            {/* {errorMsg.email !== "" && 
                                <small id="emailHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* phone number */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="phoneNumber">Phone Number: </label>
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={11} minLength={11} className="form-control" id="phoneNumber" aria-describedby="phoneNumberHelp" onChange={handlePhoneNumberChange} required/>
                            {/* {errorMsg.phone_number !== "" && 
                                <small id="phoneNumberHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* Bkash number */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="bkashNumber">Bkash Number: </label>
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={11} minLength={11} className="form-control" id="bkashNumber" aria-describedby="bkashNumberHelp" onChange={handleBkashNumberChange} required/>
                            {/* {errorMsg.bkash_acc_number !== "" && 
                                <small id="bkashNumberHelp" className="form-text text-muted">{errorMsg.bkash_acc_number}</small>
                            } */}
                        </div>
                        
                        <div className='form-group row my-5'>
                            <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={'/service'} /></div>
                            <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={createServiceProviderHandler}/></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}




