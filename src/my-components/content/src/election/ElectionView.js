import React from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'

import { useState, useEffect } from "react";


export default function ElectionView(props) {

    const splitList = window.location.href.split('/');
    const electionId = splitList[splitList.length - 1];

    const [ electionData, setElectionData ] = useState({});
    const [ datafetched, setDataFetched ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);


    function fetchelectiondata(){
        fetch(`http://127.0.0.1:8000/getElection/${electionId}`)
        .then(response => response.json())
        .then((data) => {
            setElectionData(data);
            console.log(data)
            setDataFetched(true);
        });
    }

    useEffect(() => {
        fetchelectiondata();
        console.log("data: ", datafetched)
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
                electionData.phase.toLowerCase() === 'nomination' || electionData.phase.toLowerCase() === 'pending'
                ?
                <ElectionNomination />
                :
                electionData.phase.toLowerCase() === 'voting'
                ?
                <ElectionVoting />
                :
                electionData.phase.toLowerCase() === 'ended'
                ?
                <ElectionEnded />
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

