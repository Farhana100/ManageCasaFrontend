import React, { useEffect } from 'react'
import '../../static/css/pollview.css'
import PollDesc from './miscPoll/PollDesc'
import Button from '../../../misc/Button'
import Progress_bar from '../../../misc/ProgressBar'
import { useState, useRef } from 'react'

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
   
    
    const [ pollData, setPollData ] = useState({});
    const [ optionData, setOptionData ] = useState({});
    const selectedoption = useRef("");
    const [ didvote, setDidVote ] = useState(false);
    const [ optionname, setOptionName ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);
    const [ selected, setSelected ] = useState(false);


    function fetchPoll(){
        fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
        .then(response => response.json())
        .then(data =>
          {
            console.log("poll data", data);
            setPollData(data); 
        });
      }
    
    function fetchOption(){
        fetch(`http://127.0.0.1:8000/getOptions/${pollId}`)
        .then(response => response.json())
        .then(data =>
            {
            setOptionData(data);
            console.log("option data", data);
            if(user.userType == "admin"){
                setDataFetched(true);
            }
        }
        );  
    }

    function fetchPollVote(){
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
                setOptionName(data.option)
                setDataFetched(true);
            } 
          }); 
    }

    

    function handleVoteCast(){
        console.log("casting", selectedoption)
        fetch(`http://127.0.0.1:8000/castVotePoll/${pollId}`, {
            method: 'POST',
            headers: {
            'Content-type':'application/json',
            },
            body: JSON.stringify({option: selectedoption,
                                voter: user.username,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                window.location.reload();
            } 
        }); 
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

    function selectOptionHandler(option_name){
        selectedoption.current = option_name;
    }

    useEffect(() => {
        fetchPoll();
        fetchOption();
        if(user.userType == "owner"){
            fetchPollVote();
        }
            
        setIsLoading(false);
    }, []);


    return( 
        <>
        {
        !isLoading && datafetched
        ? 
        <div>
            <PollDesc />
            <h3>Options:</h3>
        
            {optionData.map(option => {
            return(
                <>
                <div className="votelistcontainer">
                    <div className="vote-info">
                        <h5 className="card-title">{option.option_name}</h5> 
                    </div> 
                    {
                        user.userType === "admin"
                        ?
                        option.vote_count === 0 && pollData.vote_count === 0
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
                            <Progress_bar bgcolor="#452954" progress={option.vote_count/pollData.vote_count*100}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <p className='votecount'> {option.vote_count} </p>
                        </div>
                        </>
                        :
                        option.option_name === optionname
                        ?
                        <div className="voteradio">
                            <input className="vote-radio" type="radio" name="flexRadioDefault" checked="checked" id="option-radio" onChange = {(e)=>selectOptionHandler(option.option_name)}/>
                        </div>
                        :
                        <div className="voteradio">
                            <input className="vote-radio" type="radio" name="flexRadioDefault" id="option-radio" onChange = {(e)=>selectOptionHandler(option.option_name)}/>
                        </div>
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
            pollData.no_of_options === 0 ?
           
            <h5 style={{color : "red"}}> No Options! </h5>
            :
            <>
            <div className='mybtn'>
                <div></div>
                <div className='myvote'>
                    <Button text="Vote" OnClick={handleVoteCast}/>
                </div> 
            </div>
            </>
        }
        </div>
        :
        <div> Voting Loading... </div>    
    
        }
        
        </>
    )
}