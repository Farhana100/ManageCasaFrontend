import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/tenants.css'


function ApartmentSelectionDropdown ({dict}) {
    const array = Object.keys(dict);
    const options = array.map(
        (item) => {
            console.log('here',item);
            return (<>
                <option>{item}</option>
            </>)
        }
    );

    return (
        <>{options}</>
    );
}
  
export default function TenantAdd(){

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
    const [ image, setImage ] = useState(null);
    const [ selectedFile, setSelectedFile ] = useState(null);   // temporary

    const [ errorpwd, setErrorpwd ] = useState('');
    const [ errormsg, setErrorMsg ] = useState('');

// use .current for value
    const apartment_pk = useRef(-1);
    const [ allApartmentData, setAllApartmentData ] = useState({});
    const [ apartmentData, setApartmentData ] = useState(null);
    
  
    function fetchAllApartment(){
        fetch(`http://127.0.0.1:8000/getAllApartmentsWithoutTenants/${user.building}`)
        .then(response => response.json())
        .then((data) => {
            if(data){
                console.log(data);
                setAllApartmentData(data);
            }
        });
    }
    useEffect(() => {
      fetchAllApartment();    
    }, []);


    const handleApartmentChange = (e) => {
        setApartmentData(allApartmentData[e.target.value]);
        apartment_pk.current = allApartmentData[e.target.value]['id'];
        // console.log("this is a test ", apartment_pk.current);

    }

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
    
    // function createTenantHandler(e){
    //     e.preventDefault();
    //     if(password !== "" && confirmPassword !== password){
    //         // console.log("password do not match");
    //         errorMsg['password'] = "password do not match";
    //     }
    //     else {
            
    //         fetch("http://127.0.0.1:8000/createTenant", {
    //             method: 'POST',
    //             headers: {
    //             'Content-type':'application/json',
    //             },
    //             body: JSON.stringify({
                    
    //                 building: building,
    //                 username: username,
    //                 lastname: lastname,
    //                 firstname: firstname,
    //                 apartment_pk: apartment_pk.current,
    //                 password: password,
    //                 email: email,
    //                 phone_number: phone_number,
    //                 bkash_acc_number: bkash_acc_number,
    //                 selectedFiles: selectedFiles,
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(data => {
                
    //             console.log(data);
    //             if(data.success){
    //                 navigate('/tenants');
    //             }
    //             else {
    //                 console.log(data.msg);
    //                 errorMsg[data.error] = data.msg;
    //                 console.log('new test ', errorMsg['username']);
    //             }
    //         });
    //     }

    // }

    
	const handleImageChange = (e) => {
		if (e.target.files) {
            setImage(e.target.files[0]);
			setSelectedFile(URL.createObjectURL(e.target.files[0]));
		}
	};

	const renderPhotos = (source) => {
        return <img className='col-4 img-fluid shadow-sm d-block' src={source} alt="" key={source} />;
	};
    
    async function createTenantHandler(e){
        e.preventDefault();
        if(password !== "" && confirmPassword !== password){
            console.log("password do not match");
            console.log(password, confirmPassword);
            errorMsg['password'] = "password do not match";
            setErrorpwd("password do not match");
        }
        else{

            let formData = new FormData();

            formData.append('building', building);
            formData.append('username', username);
            formData.append('lastname', lastname);
            formData.append('firstname', firstname);
            formData.append('username', username);
            formData.append('apartment_pk',  apartment_pk.current);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('image', image);
            formData.append('phone_number', phone_number);
            formData.append('bkash_acc_number', bkash_acc_number);
    
            await axios({
                method: 'post', 
                url: "http://127.0.0.1:8000/createTenant",
                data: formData
            })
            .then(response => {
                if(response.data.success){
                    navigate('/tenants');
                }
                else {
                    console.log(response.data.msg);
                    errorMsg[response.data.error] = response.data.msg;
                    console.log('new test ', errorMsg['username']);
                    setErrorMsg(response.data.msg);
                }
            });
        }
    }


    let navigate = useNavigate();


  return (
    <>
        
        <h4> Add New Tenant</h4>
        <hr/>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-7'>
                    <form className='container'>
                        <div className="form-group">
                        {errorpwd && 
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errorpwd}
                            <button type="mybutton" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        }
                        {errormsg && 
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errormsg}
                            <button type="mybutton" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        }
                            <label className='h6 bold'>Add Tenant's Image</label>
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
                            <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={'/tenants'} /></div>
                            <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={createTenantHandler}/></div>
                        </div>
                    </form>
                </div>
                <div className='col-5 p-5'>
                    <div className="row mb-5">
                        <div className='col'>
                            <h5 className=''>Select Apartment:</h5>
                        </div>
                        <div className='col'>
                            <select onClick={handleApartmentChange}>
                                <ApartmentSelectionDropdown dict={allApartmentData} />
                            </select>
                        </div>
                    </div>
                    <div className='app-info-summary rounded p-4'>
                        
{/* ----------------------------------------------------- apartment description start -------------------------------------------------*/}
                    <div className="text-left">
                        {   apartmentData
                            &&
                            <>
                            <p className='h4'>{apartmentData['apartment_number']}</p>
                            <hr/>
                            <div className='container-fluid mt-5 pl-0'>
                                <div className='row'>
                                    <div className='col'><strong>Floor number: </strong></div>
                                    <div className='col'>{apartmentData['floor_number']}</div>
                                </div>
                                {apartmentData['owner'] !== 'None' &&
                                    <div className='row'>
                                        <div className='col'><strong>Owner: </strong></div>
                                        <div className='col'>{apartmentData['owner']}</div>
                                    </div>
                                }
                                {apartmentData['rent'] !== 0 &&
                                    <div className='row'>
                                        <div className='col'><strong>Rent: </strong></div>
                                        <div className='col'>{apartmentData['rent']}</div>
                                    </div>
                                }
                            </div>   
                            </>      
                        } 
                    </div>
{/* ----------------------------------------------------- apartment description end -------------------------------------------------*/}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}




