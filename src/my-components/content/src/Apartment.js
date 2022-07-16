import React from 'react'

export default function Apartment({unit, owner}){
  return (
    <div className='apartment'>
        <h5 className='apartments-title'>{unit}</h5>
        <p className='apartments-text'>{owner}</p>
    </div>
  )
}
