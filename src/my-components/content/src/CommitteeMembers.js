import React from 'react'
import '../static/css/committeeMembers.css'
import Button from '../../misc/Button'

export default function CommitteeMembers (props) {
  return (
    <div className='committee-members'>
       <div className='container'>
        <h3 className='committee-head'>List of Current Committee Members</h3>
        {props.committee.map(committeemember=> {
                return(
                    <>
                    <div className='grid-container'>
                      <div className='grid-child-element'>
                          <img className='image' src={require('../static/images/nahian.jpg')}/>
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
                      <div className='grid-child-element'>
                        <div className='button'>
                        <Button text="Edit"/>
                        </div>
                      </div>
                      <div className='grid-child-element'>
                      <div className='button'>
                        <Button text="Delete"/>
                        </div>
                      </div>
                    </div>
                    <hr/>
                    </>
                )
        })}
        <div className='button-add'>
          <Button text="Add New Committee Member"/>
        </div>
        </div>
    </div>
  
  )
}
