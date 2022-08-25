import React, { Component, useEffect } from 'react'
import '../../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Button from '../../../misc/Button'
import Progress_bar from '../../../misc/ProgressBar'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ElectionVoting(props){

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
    
    const [ nominee, setNominee ] = useState("");
    const [ voter, setVoter ] = useState("");
    const [ didVote, setDidVote ] = useState(false);
    const [ electionID, setElectionID ] = useState(null);
    const [ candidatename, setCandidateName ] = useState("");

    const [ electionVoteCount, setElectionVoteCount ] = useState(null);
    const [ ElectionCandidateCount, setElectionCandidateCount ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);

    function handleRadioSelect(name, event){
        setNominee(name);
        setElectionID(props.election.id);
        setVoter(user.username);
    }

    function handleVoteCast(){
        fetch("http://127.0.0.1:8000/castVote", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({name: nominee,
                                electionID: electionID,
                                voter: voter,
            })
          })
          .then(response => response.json())
          .then(data => {
            if(data.success){
                setDidVote(true);
                window.location.reload();
            } 
          });  
    }

    function getElectionInfo(){
        fetch(`http://127.0.0.1:8000/getElection/${electionId}`)
        .then(response => response.json())
        .then((data) => {
            setElectionVoteCount(data.vote_count)
            setElectionCandidateCount(data.no_of_candidates)
            if(user.userType === "admin"){
                setDataFetched(true);
            }
        });
        
        if(user.userType === "owner"){
            fetch(`http://127.0.0.1:8000/getElectionVote/${electionId}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({votername: user.username,})
          })
          .then(response => response.json())
          .then(data => {
            if(data.success){
                if(data.vote_existed){
                    setDidVote(true);
                }
                setCandidateName(data.nominee)
                console.log(data.msg);
                setDataFetched(true);
            } 
          });
        }
        
    }

    function handleDeleteElection(){
        fetch(`http://127.0.0.1:8000/deleteElection/${electionId}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify()
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.msg);
            if(data.success){
                window.location.replace('/election')
            }
          });
    }

    function handleEarlyStop(){
        fetch(`http://127.0.0.1:8000/earlyStop/${electionId}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify()
          })
          .then(response => response.json())
          .then(data => {
            if(data.success){
                window.location.replace('/election')
            }
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
            <h3>Candidates:</h3>
        
            {props.candidates.map(candidate => {
            return(
                <>
                {
                candidate.approval_status === "approved"
                ?
                <div className="votelistcontainer">
                <div className='nom-image'>
                        <img className='image' src={"http://127.0.0.1:8000" + candidate.image}/>
                </div>
                    <div className="vote-info">
                        <h5 className="card-title">{candidate.owner_name}</h5>
                        <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor_no}{candidate.unit_no}</small></p>  
                    </div> 
                    {
                        user.userType === "admin"
                        ?
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
                            <Progress_bar bgcolor="#452954" progress={candidate.vote_count/electionVoteCount*100}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> {candidate.vote_count} </text>
                        </div>
                        </>
                        :
                        !didVote
                        ?
                        <div className="voteradio">
                            <input className="vote-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange = {(e) => handleRadioSelect(candidate.owner_name, e)}/>
                        </div>
                        :
                        candidate.owner_name === candidatename
                        ?
                        <h5 style={{color: "green"}}> You Voted! </h5>
                        :
                        null
                    }
                    
                <hr/>
                </div>
               
                :
                null
            }
            
            
            </>
            )
        })}
        {
            user.userType === "admin"
            ?
            <>
                <div className='mybtn'>
                    <div className='btn-can'>
                        <Button text="Cancel Election" OnClick={handleDeleteElection}/>
                    </div>
                    <div className='nom-btn'>
                        <Button text="Early Stop" OnClick={handleEarlyStop}/>
                    </div> 
                </div>
            </>
            :
            !didVote
            ?
            
            ElectionCandidateCount === 0
            ?
            <h5 style={{color : "red"}}> No Candidate! </h5>
            :
            <div className='mybtn'>
                <div></div>
                <div className='myvote'>
                    <Button text="Vote" OnClick={handleVoteCast}/>
                </div> 
            </div>
            :
            null
        }
        </div>
        :
        <div> Voting Loading... </div>    
    
        }
        
        </>
    )
}