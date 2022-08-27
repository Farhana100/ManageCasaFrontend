import React, { Component, useEffect, useState } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'


/*

const fullUrl = window.location.href;
"http://localhost:2000/election/22"

const url


*/


export default function ElectionView(props){

  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [electionData, setElectionData] = useState({});
  const [ nomineeData, setNomineeData ] = useState({});
  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  function fetchElection(){
    console.log("fetching...");

    const splitList = window.location.href.split("/");
    const electtionId = splitList[splitList.length - 1];
    console.log("Election id:", electtionId);

    fetch(`http://127.0.0.1:8000/getElection/${electtionId}`)
    .then(response => response.json())
    .then(data =>
      {
        setElectionData(data);
        console.log("data:", data)  
    });
  }

  function fetchNominee(){
    console.log("fetching...")

    fetch(`http://127.0.0.1:8000/getNominees/${electionData.id}`)
    .then(response => response.json())
    .then(data =>
      {
      setNomineeData(data);
      setDataFetched(true);
      console.log("data:", data)  
    }
    );
    
  }

  useEffect(() => {
    fetchElection();
    fetchNominee()  
    setIsLoading(false);
  }, []);


  return (
    <>
    {
      !isLoading && datafetched ? (
    <>
    <ElectionNavbar/>
    {
        electionData.phase.toLowerCase() === 'nomination' || electionData.phase.toLowerCase() === "pending"
        ?
        <ElectionNomination election={election} candidates={nomineeData}/>
        :
        electionData.phase.toLowerCase() === 'voting'
        ?
        <ElectionVoting election={election} candidates={nomineeData}/>
        :
        electionData.phase.toLowerCase() === 'ended'
        ?
        <ElectionEnded election={election} candidates={nomineeData}/>
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

