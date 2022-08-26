import React, { Component, useEffect, useState } from 'react'
import ElectionNavbar from '../election/miscElection/ElectionNavbar'
import PollEnded from './PollEnded'
import PollVoting from './PollVoting'


/*

const fullUrl = window.location.href;
"http://localhost:2000/election/22"

const url


*/


export default function PollView(props){
  const splitList = window.location.href.split("/");
  const pollId = splitList[splitList.length - 1];

  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [ pollData, setPollData ] = useState({});
  const [ optionData, setOptionData ] = useState({});
  const [ datafetched, setDataFetched ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);


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
      setDataFetched(true); 
    }
    );
    
  }

  useEffect(() => {
    fetchPoll();
    fetchOption()  
    setIsLoading(false);
  }, []);


  return (
    <>
    {
      !isLoading && datafetched ? (
    <>
    <ElectionNavbar/>
    {
        pollData.phase.toLowerCase() === 'voting'
        ?
        <PollVoting/>
        :
        pollData.phase.toLowerCase() === 'ended'
        ?
        <PollEnded poll={pollData} options={optionData}/>
        :
        null
    }
    
    </>
    ) 
    :
    <div>Loading...</div>
    }
    </>
      )
}

