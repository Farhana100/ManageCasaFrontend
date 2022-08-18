import React, { Component } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import '../../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Progress_bar from '../../../misc/ProgressBar'
import { useEffect, useState } from 'react'

export default function ElectionEnded(props){
    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }

    const splitList = window.location.href.split('/');
    const electionId = splitList[splitList.length - 1];

    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);

    const [ electionVoteCount, setElectionVoteCount ] = useState(null);
    const [ electedMember, setElectedMember ] = useState(null);

    function getElectionInfo(){
        fetch(`http://127.0.0.1:8000/getElection/${electionId}`)
        .then(response => response.json())
        .then((data) => {
            setElectionVoteCount(data.vote_count)
            setElectedMember(data.elected_member);
            setDataFetched(true);
        });
    }

    useEffect(() => {
        getElectionInfo();
        setIsLoading(false);        
    }, []);

    return(
        <>
        {
        !isLoading && datafetched
        ? 
        <div>
            <ElectionDesc election={props.election}/>
            <h3> Result:</h3>

            {props.candidates.map(candidate => {
            return(
                <>
                <div className="votelistcontainer" style={{backgroundColor: candidate.owner === electedMember ? "#ECCCF5": null}}>
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                    <div className="vote-info">
                        <h5 className="card-title">{candidate.owner_name}</h5>
                        <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor_no}{candidate.unit_no}</small></p>  
                    </div> 
                    {
                        candidate.vote_count === 0 && electionVoteCount === 0
                        ?
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={0}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> {candidate.vote_count} </text>
                        </div>
                        </>
                        :
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={(candidate.vote_count/electionVoteCount*100).toFixed(2)}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> {candidate.vote_count} </text>
                        </div>
                        </>
                    }
                </div>
            <hr/>
            
            </>
            )
        })}
        </div>
        :
        <div> Voting Loading... </div>    
    
        }
        </>
    )
}