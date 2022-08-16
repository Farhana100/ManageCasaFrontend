import React, { Component } from 'react'
import { Navigate } from "react-router-dom";
import logo from '../my-components/brand/logo.svg'
import image1 from '../my-components/content/static/images/login-image.png'
import '../my-components/content/static/css/login.css'
import Footer from '../my-components/Footer'


export class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        msg: null,
    }
  }

  handleUsernameChange = (e) => {
    this.setState({
        username: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
        password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit pressed ", this.state);

    var url = "http://127.0.0.1:8000/login"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        msg : data.msg
      })
      console.log(data.msg)
      console.log(data.token)
      console.log(data.user_active)

      if (data.user_active){
        localStorage.setItem('data', JSON.stringify(data))
      }
      
      this.state.user_active = data.user_active;
      window.location.replace('/dashboard');
    });
  }

  render() {
    let user = JSON.parse(localStorage.getItem('data'));
    
    return (
      <div>
        {user && user.user_active && (
          <Navigate to="/dashboard" replace={true} />
        )}

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

                {this.state.msg && 
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.msg}
                    <button type="mybutton" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                }

                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input type="username" id="inputUsername" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} required autoFocus/>
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                
                <button className="btn btn-lg mybutton btn-block" type="submit" onClick={this.handleSubmit}>Log in</button>
                <Footer/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;