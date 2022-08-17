import React, { Component } from 'react'
import '../../static/css/electionview.css'
import '../../static/css/election.css'
import {FiEdit} from 'react-icons/fi';

export default function ElectionDesc(props){
    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }


    function approvehandler(e){
        alert(`${e.target.checked}`)
    }
    return(
        <>
        <div className='desc-header'>
            <div>
                <h3>Committee Election</h3>
            </div>
            <div>
                <text className='status'> {props.election.phase} </text>
            </div>
        </div>
        <h5 className='myh5'> Committee Member Position: {props.election.position}</h5>
        {
            props.election.phase === 'nomination'
            ?
            <div className="apprtoggle">
                <div>
                    <text className='autonom'>Auto Approve All Nominations</text>
                </div>
                <div>
                <label className="switch">
                    <input type="checkbox" onClick={approvehandler}/>
                    <span className="slider round"></span>
                </label>
                </div>
            </div>
            :
            <div className='count'>
                <p> Total Number of Participants: {props.election.vote_count}</p>
            </div>
        }
        <div className="timeinfo">
            <div>
                <p className='timename'>Nomination Start Time:</p>
            </div>
            <div>
                <p className='timev1'>{props.election.nomination_start_time}</p>
            </div>
            {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            }
            
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Nomination End Time:</p>
            </div>
            <div>
                <p className='timev2'>{props.election.nomination_end_time}</p>
            </div>
            {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            }
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Voting Start Time:</p>
            </div>
            <div>
                <p className='timev3'>{props.election.voting_start_time}</p>
            </div>
            {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            }
        </div>
        <div className="timeinfo">
            <div>
                <p className='timename'>Voting End Time:</p>
            </div>
            <div>
                <p className='timev4'>{props.election.voting_end_time}</p>
            </div>
            {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            }
        </div>
        </>
    )
}