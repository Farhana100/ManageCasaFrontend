import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../my-components/brand/logo.svg'
import Footer from '../my-components/Footer'

export default function Register() {

  
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('data'));

  if (user && user.user_active) {
      window.location.replace('/dashboard');
  }

  let errorMsg = {
    password:"",
    username:""
  }

  const [ address, setAddress ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ lastname, setLastname ] = useState("");
  const [ firstname, setFirstname ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone_number, setPhone_number ] = useState(0);
  const [ bkash_acc_number, setBkash_acc_number ] = useState(0);
  const [ msg, setMsg ] = useState(0);



  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleFirstnameChange = (e) => {
      setFirstname(e.target.value);
  }

  const handleLastnameChange = (e) => {
      setLastname(e.target.value);
  }

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
  }

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

  const handlePhoneNumberChange = (e) => {
      setPhone_number(e.target.value);
  }

  const handleBkashNumberChange = (e) => {
      setBkash_acc_number(e.target.value);
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit pressed ");

    if(password === confirmPassword){

      var url = "http://127.0.0.1:8000/register"
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify({
          
          address: address,
          username: username,
          password: password,
          lastname: lastname, 
          firstname: firstname,
          password: password,
          email: email,
          phone_number: phone_number,
          bkash_acc_number: bkash_acc_number
        })
      })
      .then(response => response.json())
      .then(data => {
  
        if(data.user_active) {
          localStorage.setItem('data', JSON.stringify(data));
          window.location.replace('/dashboard');
        }
        else{
          setMsg(data.msg);
        }
      });

    }
    else {
      setMsg('passwords do not match');
    }
  }


  return (
    <div>
      <div className="container">
        <div className="py-5 text-center">
          <div className="py-5 login-bg-grad">
              <img className="login-logo" src={logo} alt="..." />
              <h1 className="fs-3 fw-bolder">ManageCasa</h1>
          </div>
          <h2>Registration form</h2>
          <p className="lead">Please fill in the admin account information carefully</p>
        </div>

      <div className="container">
          <h5 className="mb-3">Building Details</h5>
          <hr/> {/* ------------------------------------------------------------------------------------------------------- break */}
          <form>
              {/* address  */}
            <div className="mb-3">
              <label for="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" onChange={handleAddressChange} required/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            
            {/* Bkash number */}
            <div className="mb-3">
              <label for="bkashNumber">Bkash Account Number</label>
              <input type="tel" pattern={"[0-9]{3}[0-9]{3}[0-9]{5}"} maxLength={11} minLength={11} className="form-control" id="bkashNumber" aria-describedby="bkashNumberHelp" onChange={handleBkashNumberChange} required/>
              <small id="bkashNumberHelp" className="form-text text-muted">format: {"[0-9]{3}[0-9]{3}[0-9]{5}"}</small>
            </div>
            


            <h5 className="mt-5 mb-3">Account Holder Details</h5>
            <hr/>  {/* ------------------------------------------------------------------------------------------------------- break */}
            {/* Account holder name  */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" onChange={handleFirstnameChange} required/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" onChange={handleLastnameChange} required/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
              {/* username */}
            <div className="mb-3">
              <label for="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input type="text" className="form-control" id="username" onChange={handleUsernameChange} required/>
                <div className="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>
              {/* email  */}
            <div className="mb-3">
              <label for="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={handleEmailChange} required/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
             
            {/* phone number */}
            <div className="mb-3">
              <label for="phoneNumber">Phone Number</label>
              <input type="tel" pattern={"[0-9]{3}[0-9]{3}[0-9]{5}"} maxLength={11} minLength={11} className="form-control" id="phoneNumber" aria-describedby="phoneNumberHelp" onChange={handlePhoneNumberChange} required/>
              
              <small id="phoneNumberHelp" className="form-text text-muted">format: {"[0-9]{3}[0-9]{3}[0-9]{5}"}</small>
            </div>
            
            {/* password */}
            <div className="mb-3">
              <label for="password">Password</label>
              <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" onChange={handlePasswordChange} required/>
              {/* <small id="passwordHelp" className="form-text text-muted">this is a test</small> */}
              <small id="passwordHelp" className="form-text text-muted">{errorMsg['password']}</small>
            </div>

            {/* confirm password */}
            <div className="mb-3">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" onChange={handleConfirmPasswordChange} required/>
              {/* { errorMsg.password !== "" && 
                  <small id="confirmPasswordHelp" className="form-text text-muted">{errorMsg.password}</small>
              } */}
            </div>


            <hr className="my-5"/>

            <div className='container text-center'><button className="btn btn-primary btn-lg mybutton" type="submit" onClick={handleSubmit}>Create Account</button></div>
          </form>
        </div>
      </div>
      <div className='mt-5'><Footer/></div>
    </div>
  )
}