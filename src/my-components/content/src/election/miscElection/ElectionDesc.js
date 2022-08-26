import React, { Component } from 'react'
import '../../../static/css/electionview.css'
import '../../../static/css/election.css'
import {FiEdit} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ElectionDesc(props){
    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }
    const [datafetched, setDataFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    let autoApprove = false;
    let autoapprove = false;

    function getAutoApproval(){
        fetch(`http://127.0.0.1:8000/getAutoApprove/${props.election.id}`)
        .then(response => response.json())
        .then((data) => {
            if(data.success)
                autoApprove = data.autoapprove;
                setDataFetched(true);
                console.log(autoApprove);
        });
    }

    function approvehandler(e){
        if(e.target.checked)
            autoapprove = true
        else autoapprove = false;
        fetch(`http://127.0.0.1:8000/updateAutoApprove/${props.election.id}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            autoapprove: autoapprove,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
            navigate(`/election/view/${props.election.id}`);
            }
        });
    }

    let navigate = useNavigate();

    useEffect(() => {
        getAutoApproval();
        setIsLoading(false); 
        console.log("baire:", autoApprove)       
    }, []);

    

    return(
        <>
      {!isLoading && datafetched ? (
        <div>
        <div className='desc-header'>
            <div>
                <h3>Committee Election</h3>
            </div>
            <div>
                <p className='status'> {props.election.phase} </p>
            </div>
        </div>
        <h5 className='myh5'> Committee Member Position: {props.election.position}</h5>
        {
            user.userType == "admin"
            ?
            props.election.phase === 'nomination'
            ?
            <div className="apprtoggle">
                <div>
                    <p className='autonom'>Auto Approve All Nominations</p>
                </div>
                <div>
                <label className="switch">
                    <input type="checkbox" onClick={approvehandler}/>
                    <span className="slider round"></span>
                </label>
                </div>
            </div>
            :
            null
            :
            null
        }
            <div className='count'>
                <p> Total Number of Voters: {props.election.vote_count}</p>
            </div>
        
        <div className="timeinfo">
            <div>
                <p className='timename'>Nomination Start Time:</p>
            </div>
            <div>
                <p className='timev1'>{props.election.nomination_start_time}</p>
            </div>
            {/* {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            } */}
            
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Nomination End Time:</p>
            </div>
            <div>
                <p className='timev2'>{props.election.nomination_end_time}</p>
            </div>
            {/* {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            } */}
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Voting Start Time:</p>
            </div>
            <div>
                <p className='timev3'>{props.election.voting_start_time}</p>
            </div>
            {/* {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            } */}
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Voting End Time:</p>
            </div>
            <div>
                <p className='timev4'>{props.election.voting_end_time}</p>
            </div>
            {/* {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            } */}
        </div>
        </div>
        ) : (
            <div> Loading... </div>
          )}
        </>
    )
}