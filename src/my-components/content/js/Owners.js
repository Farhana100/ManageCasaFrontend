import React from 'react'
import {Owner} from './Owner';
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
                    <div className='grid-child-elemenr'>
                    <div className='row'>
                        <Owner key={owner.id} owner={owner}/>
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
