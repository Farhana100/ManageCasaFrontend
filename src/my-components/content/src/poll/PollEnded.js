import React, { Component } from 'react'
import ElectionNavbar from '../election/miscElection/ElectionNavbar'
import '../../static/css/pollview.css'
import PollDesc from './miscPoll/PollDesc'
import Progress_bar from '../../../misc/ProgressBar'
import { useEffect, useState } from 'react'

export default function PollEnded(props){
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

    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);

    const [ pollVoteCount, setPollVoteCount ] = useState(null);
    const [ selectedoption, setSelectedOption ] = useState(null);

    function getPollInfo(){
        fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
        .then(response => response.json())
        .then((data) => {
            setPollVoteCount(data.vote_count)
            setSelectedOption(data.selected_option);
            setDataFetched(true);
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
            <h3> Result:</h3>

            {props.options.map(option => {
            return(
                <>
                <div className="votelistcontainer" style={{backgroundColor: option.option_name === selectedoption ? "#ECCCF5": null}}>
                    <div className="vote-info">
                        <h5 className="card-title">{option.option_name}</h5> 
                    </div> 
                    {
                        option.vote_count === 0 && pollVoteCount === 0
                        ?
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={0}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> {option.vote_count} </text>
                        </div>
                        </>
                        :
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress={(option.vote_count/pollVoteCount*100).toFixed(2)}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> {option.vote_count} </text>
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