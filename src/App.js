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
    this.state = {
      data:{
        // username:"nahian",
        // user_active: true,
        // userType: 'admin'
      }
     };
    this.fetchUserStatus = this.fetchUserStatus.bind(this);
  };

  componentDidMount(){
    this.fetchUserStatus();
  };

  fetchUserStatus(){
    fetch('http://127.0.0.1:8000/getUser')
    .then(response => response.json())
    .then(data =>
          this.setState({
           data:data 
          })
          // console.log(data)
      );
    console.log("this state", this.state);
  };

  render(){
    var user = this.state.data
    console.log('user ', user)

    return (
      <>
        <Header username={user.username} userActive={user.user_active}/>
        {user.user_active
          ? 
          <div className='app-grid-container'>
            <Navbar userType={user.userType}/>
            <div className='p-3'><Content/></div>
          </div>
          :
          <Router>
            <Routes>
              <Route path="/login" exact element={<Login/>} />
              <Route path="/register" exact element={<Register/>} />
              <Route path="/home" exact element={<Home/>} />
              {/* <Route path="*" exact element={<Home/>} /> */}
            </Routes>
          </Router> 
        }

      {/* {user.user_active */
          // ? 
          // <div className='app-grid-container'>
          //   <Navbar userType={user.userType}/>
          //   <div className='p-3'><Content /></div>
          // </div>
          // :
          // <Router>
          //   <Routes>
          //     <Route path="/login" exact element={<Login/>} />
          //     <Route path="/register" exact element={<Register/>} />
          //     <Route path="/home" exact element={<Home/>} />
          //     {/* <Route path="*" exact element={<Home/>} /> */}
          //   </Routes>
          // </Router> 
        }
      </>
    );
  }
}

export default App;