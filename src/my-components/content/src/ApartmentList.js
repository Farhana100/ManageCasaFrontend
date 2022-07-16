import React from 'react'
import Apartment from './Apartment';

export default function ApartmentList (props) {
  return (
    <div className='apartments'>
      <div className='container'>
        {props.apartments.map(apartment=> {
          return(
            <>
            <p className='my-3 mx-3'>{apartment.floor}st floor</p>
            <div className='col'>
                <Apartment key={apartment.id} unit={apartment.unit} owner={apartment.owner}/>
            </div>
          </>
        )})}
      </div>
    </div>
  
  )
}
