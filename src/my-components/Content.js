import React from 'react'
import Tenants from './content/src/Tenants';
import CommitteeMembers from './content/src/CommitteeMembers';
import Owners from './content/src/Owners';
import Button from './misc/Button'

import './content/css/content.css';


export default function Content() {
  
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

  return (
    <div className='p-2'>
      {/* <Button/> */}
      {/* <Button style={"mybutton-light"}/> */}
      {/* <Tenants tenants={tenants}/> */}
      {/* <Owners owners={owners}/> */}
      <CommitteeMembers committee={committeemembers}/>
      {/* content */}
    </div>
  )
}
