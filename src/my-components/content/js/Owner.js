import React from 'react'
import '../css/owners.css';

export const Owner = (props) => {
  return (
    <div className='owner'>
        <h5 className='owner-title'>{props.owner.name}</h5>
        <p className='owner-text'> Apartment No. {props.owner.floor}{props.owner.unit}</p>
        <p>Mobile No. {props.owner.phone_no}</p>
    </div>
  )
}
