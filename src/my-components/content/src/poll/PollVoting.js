import React, { useEffect } from 'react'
import '../../static/css/electionview.css'
import PollDesc from './miscPoll/PollDesc'
import Button from '../../../misc/Button'
import Progress_bar from '../../../misc/ProgressBar'
import { useState } from 'react'

export default function PollVoting(props){

    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }

    const splitList = window.location.href.split('/');
    const pollId = splitList[splitList.length - 1];
    
    const [ option, setOption ] = useState("");
    const [ voter, setVoter ] = useState("");
    const [ didVote, setDidVote ] = useState(false);
    const [ pollID, setPollID ] = useState(null);
    const [ optionname, setOptionName ] = useState("");

    const [ pollVoteCount, setPollVoteCount ] = useState(null);
    const [ pollOptionCount, setPollOptionCount ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);

    function handleRadioSelect(name, event){
        setOption(name);
        setPollID(props.poll.id);
        setVoter(user.username);
    }

    function handleVoteCast(){
        fetch("http://127.0.0.1:8000/castVotePoll", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({option_name: option,
                                pollID: pollID,
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

    function getPollInfo(){
        fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
        .then(response => response.json())
        .then((data) => {
            setPollVoteCount(data.vote_count)
            setPollOptionCount(data.no_of_options)
            if(user.userType === "admin"){
                setDataFetched(true);
            }
        });
        
        if(user.userType === "owner"){
            fetch(`http://127.0.0.1:8000/getPollVote/${pollId}`, {
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
                setOptionName(data.option_name)
                console.log(data.msg);
                setDataFetched(true);
            } 
          });
        }
        
    }

    function handleDeletePoll(){
        fetch(`http://127.0.0.1:8000/deletePoll/${pollId}`, {
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
                window.location.replace('/election/poll')
            }
          });
    }

    function handleEarlyStop(){
        fetch(`http://127.0.0.1:8000/earlyStopPoll/${pollId}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify()
          })
          .then(response => response.json())
          .then(data => {
            if(data.success){
                window.location.replace('/election/poll')
            }
          });
    }

    useEffect(() => {
        getPollInfo();
        setIsLoading(false);        
    }, []);


    return( 
        <>
        {
        !isLoading && datafetched
        ? 
        <div>
            <PollDesc poll={props.poll}/>
            <h3>Options:</h3>
        
            {props.options.map(option => {
            return(
                <>
                <div className="votelistcontainer">
                    <div className="vote-info">
                        <h5 className="card-title">{option.option_name}</h5> 
                    </div> 
                    {
                        user.userType === "admin"
                        ?
                        option.vote_count === 0 && pollVoteCount === 0
                        ?
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={0}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <p className='votecount'> {option.vote_count} </p>
                        </div>
                        </>
                        :
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={option.vote_count/pollVoteCount*100}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <p className='votecount'> {option.vote_count} </p>
                        </div>
                        </>
                        :
                        !didVote
                        ?
                        <div className="voteradio">
                            <input className="vote-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange = {(e) => handleRadioSelect(option.option_name, e)}/>
                        </div>
                        :
                        option.option_name === optionname
                        ?
                        <h5 style={{color: "green"}}> You Voted! </h5>
                        :
                        null
                    }
                    
                <hr/>
                </div>
            </>
            )
        })}
        {
            user.userType === "admin"
            ?
            <>
                <div className='mybtn'>
                    <div className='btn-can'>
                        <Button text="Cancel Election" OnClick={handleDeletePoll}/>
                    </div>
                    <div className='nom-btn'>
                        <Button text="Early Stop" OnClick={handleEarlyStop}/>
                    </div> 
                </div>
            </>
            :
            !didVote
            ?
            
            pollOptionCount === 0
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