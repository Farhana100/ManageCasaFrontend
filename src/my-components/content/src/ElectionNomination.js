import React, { Component } from 'react'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Button from '../../misc/Button'

export default function ElectionNomination(props) {
    return(
        <>
            <ElectionDesc election={props.election}/>
            <h3>Nominees: </h3>
        {props.candidates.map(candidate => {
            return(
                <>
                <div className="nomlistcontainer">
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                <div className="nom-info">
                    <h5 className="card-title">{candidate.owner_name}</h5>
                    <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor_no}{candidate.unit_no}</small></p>  
                </div> 
                {
                    props.user.userType === "admin"
                    ?
                    <>
                    <div className='nom-btn'>
                        <Button text="Approve"/>
                    </div>
                    <div className='nom-btn'>
                        <Button text="Delete"/>
                    </div>  
                    </>
                    :
                    <>
                    <div></div>
                    <div>
                        {candidate.approval_status}
                    </div>  
                    </>
                }
                 
            </div>
            <hr/>
            
            </>
            )
        })}
        {
            props.user.userType === "admin"
            ?
            <>
            <div className='mybtn'>
                <div className='btn-can'>
                        <Button text="Cancel Election"/>
                </div>
                <div className='nom-btn'>
                    <Button text="Early Stop"/>
                </div> 
            </div>
            </>
            :
            <div className='mybtn'>
                <div></div>
                <div className='mynom'>
                    <Button text="Nominate Yourself" OnClick={() => {alert(`${"you have nominated yourself"}`);}}/>
                                                                            
                </div> 
            </div>
        }

        </>
    )
}