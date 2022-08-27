import React, { Component } from 'react'
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

    const [ pollData, setPollData ] = useState({});
    const [ optionData, setOptionData ] = useState({});

    function fetchPoll(){
        fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
        .then(response => response.json())
        .then((data) => {
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

    useEffect(() => {
        fetchPoll();
        fetchOption();
        setIsLoading(false);        
    }, []);

    return(
        <>
        {
        !isLoading && datafetched
        ? 
        <div>
            <PollDesc />
            <h3> Result:</h3>

            {optionData.map(option => {
            return(
                <>
                <div className="votelistcontainer" style={{backgroundColor: option.option_name === pollData.selected_option ? "#ECCCF5": null}}>
                    <div className="vote-info">
                        <h5 className="card-title">{option.option_name}</h5> 
                    </div> 
                    {
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
                            <Progress_bar bgcolor="#452954" progress={(option.vote_count/pollData.vote_count*100).toFixed(2)}  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <p className='votecount'> {option.vote_count} </p>
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
        <div> Ended Loading... </div>    
    
        }
        </>
    )
}