import React from 'react'
import PropTypes from 'prop-types'
import Home from './Home'
import Tenants from './content/src/Tenants';
import Committee from './content/src/Committee';
import Owners from './content/src/Owners';
import CommitteeAdd from './content/src/CommitteeAdd';
import Election from './content/src/Election';
import Button from './misc/Button'

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './content/static/css/content.css';
import ElectionView from './content/src/ElectionView';
import CreateElection from './content/src/ElectionCreate';
import Login from './Login';
import ElectionDesc from './content/src/miscElection/ElectionDesc';
import ElectionNomination from './content/src/ElectionNomination';
import ElectionVoting from './content/src/ElectionVoting';
import ElectionEnded from './content/src/ElectionEnded';

export default function Content() {
  let user = JSON.parse(localStorage.getItem('data'));
  
  return(
    <Router>
      <Routes>
        <Route path="/owners" element={<Owners owners={owners}/>} />
        <Route path="/tenants" element={<Tenants tenants={tenants}/>} />
        <Route path="/committee" element={<Committee committee={committeemembers} user={user}/>}/>
        <Route path="/addcommittee" element={<CommitteeAdd user={user}/> } />
        <Route path="/election" element={<Election elections={elections} user={user}/>} />
        <Route path="createelection" element={<CreateElection user={user}/>}/>
        <Route path="/viewelection" element={<ElectionView elections={elections} candidates={candidates} user={user}/>} />
        
        {/* <Route path="/descelection" element={<ElectionDesc elections={elections}/>} />
        <Route path="/nomelection" element={<ElectionNomination elections={elections} candidates={candidates}/>} />
        <Route path="/votelection" element={<ElectionVoting elections={elections} candidates={candidates}/>} />
        <Route path="/endelection" element={<ElectionEnded elections={elections} candidates={candidates}/>} /> */}

      </Routes>
    </Router>
  );
}

let user = "admin";

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
    status: 'Voting',
    candidates: ['Nahian', 'Farhana', 'Utsha', 'Alif'],
    winner: '',
    create_time: '2020-01-01',
    nom_start_time: '2020-01-01',
    nom_end_time: '2020-01-01',
    voting_start_time: '2020-01-01',
    voting_end_time: '2020-01-01',
  },
  {
    name: 'Secretary',
    status: 'Ended',
    candidates: ['nahian', 'farhana', 'utsha', 'alif'],
    winner: 'nahian',
    create_time: '2020-01-01',
    nom_start_time: '2020-01-01',
    nom_end_time: '2020-01-01',
    voting_start_time: '2020-01-01',
    voting_end_time: '2020-01-01',
  },
  {
    name: 'President',
    status: 'Nomination',
    candidates: ['nahian', 'farhana', 'utsha', 'alif'],
    winner: '',
    create_time: '2020-01-01',
    nom_start_time: '2020-01-01',
    nom_end_time: '2020-01-01',
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