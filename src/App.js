import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './my-components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';

import Owners from './my-components/content/src/Owners';
import Apartments from './my-components/content/src/Apartments';
import Tenants from './my-components/content/src/Tenants';
import Committee from './my-components/content/src/Committee';
import AddCommittee from './my-components/content/src/CommitteeAdd';
import Election from './my-components/content/src/Election';
import ElectionCreate from './my-components/content/src/ElectionCreate';
import Election_View from './my-components/content/src/Election_View';


function App() {

  // check if user is logged in
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    }
  }

  return (
    <>
      <Header username={user.username} userActive={user.user_active}/>
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/register" element={<Register/>} exact />
          <Route path="/" element={<PrivateRoute/>} exact>
            <Route path="/owners" element={<Owners owners={owners}/>} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/tenants" element={<Tenants tenants={tenants}/>} />
            <Route path="/committee" element={<Committee committee={committeemembers} user={user}/>}/>
            <Route path="/addcommittee" element={<AddCommittee user={user}/> } />
            <Route path="/election" element={<Election user={user}/>} />
            <Route path="/createelection" element={<ElectionCreate user={user}/>}/>
            <Route path="/viewelection/:id" element={<Election_View user={user}/>}/>
              {/* <Route path=':id' element={<Election_View user={user}/>} /> */}
            {/* </Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );

}



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




export default App;