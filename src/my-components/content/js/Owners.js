import React from 'react'
import '../css/owners.css';

export const Owners = (props) => {
  return (
    <div className='owners'>
       <div className='container'>
        <h3 className='owner_head'>List of Flat Owners</h3>
        {props.owners.map(owner=> {
                return(
                    <>
                    <div className='grid-container'>
                    <div className='grid-child-element'>
                        <img className='image' src={require('../images/nahian.jpg')}/>
                    </div>
                    <div className='grid-child-element'>
                    <div className='row'>
                        <h5 className='owner-title'>{owner.name}</h5>
                        <p className='owner-text'> Apartment No. {owner.floor}{owner.unit}</p>
                        <p className='mobile'>Mobile No. {owner.phone_no}</p>
                    </div>
                    </div>
                    </div>
                    <hr/>
                    </>
                )
        })}
        </div>
    </div>
  
  )
}
