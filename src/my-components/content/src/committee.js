import React from 'react'
import Button from '../../misc/Button'
import '../static/css/committee.css';

export default function Committee (props) {
  return (
    <div className='committee'>
       <div className='container'>
        <h3 className='committee_hd'>List of Current Committee Members</h3>
        {props.committee.map(committeemember=> {
            return( 
                <div className="flex-container">
                    <div className='fitem image'>
                          <img className='image' src={require('../static/images/nahian.jpg')}/>
                      </div>
                    <div className="fitem info">
                        <h5 className="card-title">{committeemember.name}</h5>
                        <p className="card-text">{committeemember.position}</p>
                        <p className="card-text"><small className="text-muted">Apartment No. {committeemember.floor}</small></p>  
                    </div>       
                    <div className='fitem button'>
                        <Button text="Edit"/>
                    </div>
                    <div className='fitem button'>
                        <Button text="Delete"/>
                    </div>
                </div>
                )
        })}
        <div className='flex-end'>
            <Button text="Add New Committee Member"/>
        </div>
        
        </div>
    </div>
  
  )
}
