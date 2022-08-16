import React, {Children, Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';
import Home from './my-components/Home';
import Login from './my-components/Login';
import Register from './my-components/Register';


import Tenants from './my-components/content/src/Tenants';
import Committee from './my-components/content/src/Committee';
import Owners from './my-components/content/src/Owners';
import AddCommittee from './my-components/content/src/CommitteeAdd';
import Election from './my-components/content/src/Election';
import Election_View from './my-components/content/src/Election_View';
import ElectionCreate from './my-components/content/src/ElectionCreate';





let apartments = [
  {
    id: 1,
    floor: 1,
    unit: 'A',
    owner: 'John Doe'
  },
  {
    id: 2,
    floor: 1,
    unit: 'B',
    owner: 'Jane Doe'
  },
  {
    id: 3,
    floor: 1,
    unit: 'C',
    owner: 'John Doe'
  },
  {
    id: 4,
    floor: 2,
    unit: 'A',
    owner: 'Janei Doe'
  },
  {
    id: 5,
    floor: 2,
    unit: 'B',
    owner: 'Johny Doe'
  },
  {
    id: 6,
    floor: 2,
    unit: 'C',
    owner: 'Janes Doe'
  }
]
let tenants = [
  {
    id: 1,
    name: 'John Doe',
    floor: 1,
    unit: 'A',
    email: 'john@gmail.com',
    phone_no: '1234567890',
    bkash_no: '1234567890',
  },
  {
    id: 2,
    name: 'Jane Doe',
    floor: 2,
    unit: 'B',
    email: 'jane@gmail.com',
    phone_no: '123456790',
    bkash_no: '123456790',
  },
  {
    id: 3,
    name: 'Johny Doe',
    floor: 1,
    unit: 'C',
    email: 'johny@gmail.com',
    phone_no: '123456789',
    bkash_no: '123456789',
  }
]
let owners = [
  {
    id: 1,
    name: 'John Doe',
    floor: 1,
    unit: 'A',
    email: 'john@gmail.com',
    phone_no: '1234567890',
    bkash_no: '1234567890',
  },
  {
    id: 2,
    name: 'Jane Doe',
    floor: 2,
    unit: 'B',
    email: 'jane@gmail.com',
    phone_no: '123456790',
    bkash_no: '123456790',
  },
  {
    id: 3,
    name: 'Johny Doe',
    floor: 1,
    unit: 'C',
    email: 'johny@gmail.com',
    phone_no: '123456789',
    bkash_no: '123456789',
  }
]
let committeemembers= [
  {
    id: 1,
    name: 'John Doe',
    floor: 1,
    unit: 'A',
    email: 'john@gmail.com',
    phone_no: '1234567890',
    bkash_no: '1234567890',
    position: 'President',
  },
  {
    id: 2,
    name: 'Jane Doe',
    floor: 2,
    unit: 'B',
    email: 'jane@gmail.com',
    phone_no: '123456790',
    bkash_no: '123456790',
    position: 'Vice President',
  },
  {
    id: 3,
    name: 'Johny Doe',
    floor: 1,
    unit: 'C',
    email: 'johny@gmail.com',
    phone_no: '123456789',
    bkash_no: '123456789',
    position: 'Secretary',
  }
]

let elections= [
  {
    name: 'President',
    phase: 'voting',
    candidates: ['Nahian', 'Farhana', 'Utsha', 'Alif'],
    winner: '',
    creation_time: '2020-01-01',
    nomination_start_time: '2020-01-01',
    nomination_end_time: '2020-01-01',
    voting_start_time: '2020-01-01',
    voting_end_time: '2020-01-01',
  }
]

let candidates = [
  {
    id: 1,
    name: 'Nahian',
    floor: 1,
    unit: 'A',
    status: "approved"
  },
  {
    id: 2,
    name: 'Farhana',
    floor: 1,
    unit: 'B',
    status: "pending"
  }
]



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
        {
          user && user.user_active &&
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