import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../my-components/brand/logo.svg'
import image1 from '../my-components/content/static/images/login-image.png'
import '../my-components/content/static/css/login.css'
import Footer from '../my-components/Footer'


export default function Login (){

  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('data'));
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ msg, setMsg ] = useState('');

  if (user && user.user_active) {
      window.location.replace('/dashboard');
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit pressed ");

    var url = "http://127.0.0.1:8000/login"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {

      if(data.user_active) {
        // setMsg(data.msg);
        localStorage.setItem('data', JSON.stringify(data));
        navigate('/dashboard');
      }
      else{
        setMsg(data.msg);
      }
    });
  }

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

              {msg && 
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {msg}
                  <button type="mybutton" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              }

              <label htmlFor="inputUsername" className="sr-only">Username</label>
              <input type="username" id="inputUsername" className="form-control" placeholder="Username" value={username} onChange={handleUsernameChange} required autoFocus/>
              
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
              
              <button className="btn btn-lg mybutton btn-block" type="submit" onClick={handleSubmit}>Log in</button>
              <Footer/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}