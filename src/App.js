import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './my-components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';

import Owners from './my-components/content/src/Owners';

import Apartments from './my-components/content/src/apartment/Apartments';
import ApartmentList from './my-components/content/src/apartment/ApartmentList';
import ApartmentView from './my-components/content/src/apartment/ApartmentView';

import Tenants from './my-components/content/src/Tenants';

import Committee from './my-components/content/src/Committee';
import AddCommittee from './my-components/content/src/CommitteeAdd';

import Election from './my-components/content/src/election/Election';
import ElectionCreate from './my-components/content/src/election/ElectionCreate';
import Election_View from './my-components/content/src/election/Election_View';

import NotFound from './pages/NotFound';
import ToBeMade from './my-components/content/src/ToBeMade';
import ElectionList from './my-components/content/src/election/ElectionList';


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
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<ToBeMade/>} />
            <Route path="/apartments" element={<Apartments />}>
              <Route path="/apartments/" element={<ApartmentList/>} />
              <Route path="/apartments/:id" element={<ApartmentView />} />
            </Route>
            <Route path="/committee" element={<Committee committee={committeemembers} user={user}/>}/>
            <Route path="/addcommittee" element={<AddCommittee user={user}/> } />
            <Route path="/owners" element={<Owners/>} />
            <Route path="/tenants" element={<Tenants tenants={tenants}/>} />
            <Route path="/employees" element={<ToBeMade/>} />
            <Route path="/service" element={<ToBeMade/>} />
            <Route path="/forum" element={<ToBeMade/>} />
            <Route path="/finance" element={<ToBeMade/>} />
            <Route path="/complaints" element={<ToBeMade/>} />
            <Route path="/dues" element={<ToBeMade/>} />
            <Route path="/paymenthistory" element={<ToBeMade/>} />
            <Route path="/notice" element={<ToBeMade/>} />
            <Route path="/election" element={<Election />}>
              <Route path="/election" element={<ElectionList/>} />
              <Route path="/election/create" element={<ElectionCreate/>}/>
              <Route path="/election/view/:id" element={<Election_View/>}/>
            </Route>
            <Route path="/visitors" element={<ToBeMade/>} />
          </Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </>
  );

}




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


export default App;