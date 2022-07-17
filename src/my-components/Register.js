import React from 'react'
import logo from './brand/logo.svg'
import Brand from './Brand'
import Footer from './Footer'

const divisions = ["Dhaka", "Barishal", "Chattogram", "Khulna", "Rajshahi", "Rangpur", "Mymensingh", "Sylhet"];
const districts = {
  "Dhaka" : [],
  "Barishal" : [],
  "Chattogram" : [],
  "Khulna" : [],
  "Rajshahi" : [],
  "Rangpur" : [],
  "Mymensingh" : [],
  "Sylhet" : []
}

export default function Register() {
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
          <h5 className="mb-3">Account Holder Details</h5>
          <hr/> {/* ------------------------------------------------------------------------------------------------------- break */}
          <form>

            {/* Account holder name  */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input type="text" className="form-control" id="username" placeholder="Username" required/>
                <div className="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>


            <h5 className="mt-5 mb-3">Account Holder Details</h5>
            <hr/>  {/* ------------------------------------------------------------------------------------------------------- break */}
            <div className="mb-3">
              <label for="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label for="division">Division</label>
                <select className="custom-select d-block w-100" id="division" required>
                  <option value="">Choose...</option>
                  {divisions.map(division=> {
                          return(
                              <option>{division}</option>
                          )
                  })}
                </select>
                <div className="invalid-feedback">
                  Please select a valid division.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label for="district">District</label>
                <select className="custom-select d-block w-100" id="district" required>
                  <option value="">Choose...</option>
                  {divisions.map(division=> {
                      return(
                          <option>{division}</option>
                      )
                  })}
                </select>
                <div className="invalid-feedback">
                  Please provide a valid district.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required/>
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4"/>

            <div className='container text-center'><button className="btn btn-primary btn-lg mybutton" type="submit">Create Account</button></div>
          </form>
        </div>
      </div>
      <div className='mt-5'><Footer/></div>
    </div>
  )
}
