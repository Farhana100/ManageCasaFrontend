import React from 'react'
import logo from './brand/logo.svg'
import image1 from './content/static/images/login-image.png'
import './content/static/css/login.css'
import Footer from './Footer'

export default function Login() {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row text-center'>
          <div className='col-8 d-none d-lg-block p-0 login-col1'>
            <img className="login-image" src={image1} alt="..." />  
          </div>
          <div className='col-lg-4 login-col2'>
            <form className="form-login">
              <div className="py-5 login-bg-grad">
                  <img className="login-logo" src={logo} alt="..." />
                  <h1 className="fs-3 fw-bolder">ManageCasa</h1>
              </div>
              <h1 class="h5 mb-3 font-weight-normal">Please Log in</h1>
              
              <label for="inputUsername" className="sr-only">Username</label>
              <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autofocus/>
              
              <label for="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              
              <button className="btn btn-lg mybutton btn-block" type="submit">Log in</button>
              <Footer/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
