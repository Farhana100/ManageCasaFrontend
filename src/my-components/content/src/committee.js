import React from 'react'
import Button from '../../misc/Button'
// import '../css/committeemembers.css';

export default function Committee (props) {
  return (
    <div className='committee'>
       <div className='container'>
        <h3 className='committee_hd'>List of Current Committee Members</h3>
        {props.committee.map(committeemember=> {
            return( 
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className='info'>
                                <h5 className="card-title">{committeemember.name}</h5>
                                <p className="card-text">{committeemember.position}</p>
                                <p className="card-text"><small className="text-muted">Apartment No. {committeemember.floor}</small></p>
                            </div>
                            <div className='button'>
                                <Button text="Delete"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                )
        })}

        
        </div>
    </div>
  
  )
}
