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


// export default function Content({page, content_vars, user}) {
//   switch(page.toLowerCase()) {
//     case "committee members":
//       return ( <Committee committee={content_vars} user={user}/> )
//     case "tenants":
//       return ( <Tenants tenants={content_vars}/> )
//     case "owners":
//       return ( <Owners owners={content_vars}/> )
//     case "add committee member":
//       return ( <AddCommittee/> )
//     case "election":
//         return ( <Election/> )
//     default:
//       return (<>content</>)
//   }
// }



export default function Content() {
  return(
    <Router>
      <Routes>
        <Route path="/owners" element={<Owners owners={owners}/>} />
        <Route path="/tenants" element={<Tenants tenants={tenants}/>} />
        <Route path="/committee" element={<Committee committee={committeemembers} user={user}/>}/>
        <Route path="/addcommittee" element={<CommitteeAdd/>} />
        <Route path="/election" element={<Election/>} />
      </Routes>
    </Router>
  );
}

Content.defaultProps = {
  page: null,
  content_vars: null,
}

Content.propTypes = {
  page: PropTypes.string,
  content_vars: PropTypes.any,
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