import React from 'react'
import '../css/committeemembers.css';

export const CommitteeMembers = (props) => {
  return (
    <div className='committeemembers'>
       <div className='container'>
        <h3 className='committee_head'>List of Current Committee Members</h3>
        {props.committee.map(committeemember=> {
                return(
                    <>
                    <div className='grid-container'>
                    <div className='grid-child-element'>
                        <img className='image' src={require('../images/nahian.jpg')}/>
                    </div>
                    <div className='grid-child-element'>
                    <div className='row'>
                        <h5 className='committee-title'>{committeemember.name}</h5>
                        <p className='position'>{committeemember.position} </p>
                        <p className='committee-text'> Apartment No. {committeemember.floor}{committeemember.unit}
                        <br/>
                        Mobile No. {committeemember.phone_no}
                        </p>  
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
