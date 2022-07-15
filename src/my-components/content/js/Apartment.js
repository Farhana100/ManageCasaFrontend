import React from 'react'
// import '../css/apartments.css';

export default function Apartment(props){
  return (
    <div className='apartment'>
        <h5 className='apartments-title'>{props.unit}</h5>
        <p className='apartments-text'>{props.owner}</p>
    </div>
  )
}
