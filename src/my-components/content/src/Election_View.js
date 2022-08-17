import React from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'

import { useState, useEffect } from "react";


export default function Election_View(props) {

    const splitList = window.location.href.split('/');
    const electionId = splitList[splitList.length - 1];

    const [ electionData, setElectionData ] = useState({});
    const [ nomineesData, setNomineesData ] = useState({});
    const [ datafetched, setDataFetched ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);


    function fetchelectiondata(){
        fetch(`http://127.0.0.1:8000/getElection/${electionId}`)
        .then(response => response.json())
        .then((data) => {
            setElectionData(data);
        });
    }

    function fetchonomineedata(){
        fetch(`http://127.0.0.1:8000/getNominees/${electionId}`)
        .then(response => response.json())
        .then((data) => {
            setNomineesData(data);
            setDataFetched(true);
        });
    }

    useEffect(() => {
        fetchelectiondata();
        fetchonomineedata();
        setIsLoading(false);        
    }, []);
    
    

    return (
    <>
    {
        !isLoading && datafetched
        ? 
        <div>
            <ElectionNavbar/>
            {
                electionData.phase === 'nomination' || electionData.phase === 'pending'
                ?
                <ElectionNomination election={electionData} candidates={nomineesData} />
                :
                electionData.phase === 'voting'
                ?
                <ElectionVoting election={electionData} candidates={nomineesData} />
                :
                electionData.phase === 'ended'
                ?
                <ElectionEnded election={electionData} candidates={nomineesData} />
                :
                null
            }
        </div>
            
        :
        <div> Loading... </div>    
    
        }
    </>
    )
}

