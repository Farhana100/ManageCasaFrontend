import React, { Component, useEffect, useState } from 'react'
import PollDesc from './miscPoll/PollDesc'
import Button from '../../../misc/Button'
import '../../static/css/pollview.css'

export default function PollPending(props) {

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
    const [ isLoading, setIsLoading ] = useState(true);
    const [ datafetched, setDataFetched ] = useState(false);

    function fetchPoll(){
        fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
        .then(response => response.json())
        .then(data =>
          {
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
            <h3>Options: </h3>
            {optionData.map(option => {
            return(
                <>
                <div className="nom-info">
                    <h5 className="card-title">{option.option_name}</h5>
                </div> 
                <hr/>
         
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
            null
        }
        </div>
        :
        <div> Pending Loading... </div>    
    
        }
        </>
    )
}