import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';
import Home from './my-components/Home';
import Login from './my-components/Login';
import Register from './my-components/Register';

export class App extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   data:{}
    //  };
    // this.fetchUserStatus = this.fetchUserStatus.bind(this);
  };

  // componentDidMount(){
  //   this.fetchUserStatus();
  // };

  // fetchUserStatus(){
  //   fetch('http://127.0.0.1:8000/getUser')
  //   .then(response => response.json())
  //   .then(data =>
  //         this.setState({
  //          data:data 
  //         })
  //         // console.log(data)
  //     );
  //   console.log("this state", this.state);
  // };

  render(){
    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
      console.log('DEBUG');
      user = {
       username: "",
       userType: "",
       user_active: false,
      }
      console.log("i am here");
    }

    return (
      <>
        <Header username={user.username} userActive={user.user_active}/>
        <Router>
          <Routes>
            <Route path="/login" exact element={<Login/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/" exact element={<Home/>} />
          </Routes>
        </Router> 

        {user && user.user_active &&

          <div className='app-grid-container'>
            <Navbar userType={user.userType}/>
            <div className='p-3'><Content/></div>
          </div>
        }
      </>
    );
  }
}

export default App;