import React, { Component } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Progress_bar from '../../misc/ProgressBar'

export default function ElectionEnded(props){
    console.log("Ended")
    return(
        <>
            <ElectionDesc election={props.election}/>
            <h3> Result:</h3>

            {props.candidates.map(candidate => {
            return(
                <>
                <div className="votelistcontainer">
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                    <div className="vote-info">
                        <h5 className="card-title">{candidate.owner}</h5>
                        <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor_no}{candidate.unit_no}</small></p>  
                    </div> 
                    <div className='progbar'>
                    <Progress_bar bgcolor="#452954" progress='30'  height={15}/> 
                    </div>
                     <div className='votecnt'>
                     <text className='votecount'> {props.election.vote_count} </text>
                     </div>
                    
                </div>
            <hr/>
            
            </>
            )
        })}
        </>
    )
}