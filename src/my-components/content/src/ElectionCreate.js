import React, { Component, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Button from '../../misc/Button';
import DateTimePicker from '../../misc/DateTimePicker';
import ElectionNavbar from './miscElection/ElectionNavbar';


export default function ElectionCreate(props){
    const [ positionData, setPositionData ] = useState("");
    const [ nomstartData, setNomStartData ] = useState(new Date().toLocaleDateString('fr-FR'));
    const [ nomendData, setNomEndData ] = useState();
    const [ votestartData, setVoteStartData ] =useState();
    const [voteEndData, setVoteEndData ] = useState();
    
    const handlepositionchange = (e) => {
        setPositionData(e.target.value);
        console.log("position: ", e.target.value);
        console.log("set position: ", positionData);
    }
    function handleNomStart(e){
        setNomStartData(e.target.value);
        console.log("nom start date: ", nomstartData);
    }
    function handleNomEnd(e){
        setNomEndData(e.target.value);
    }

    function handleVoteStart(e){
        setVoteStartData(e.target.value);
    }
    function handleVoteEnd(e){
        setVoteEndData(e.target.value);
    }

    function approvehandler(e){
        alert(`${e.target.checked}`)
    }

    function createElectionHandler(){
        
    }



  return (
    <>
        <ElectionNavbar/>
        <h3> Create New Committee Election</h3>
        <div className="form-elec">
            <div>
                <h5 className='elecname'>Committee Member Position:</h5>
            </div>
            <div>
            <select className="elec-pos" id="selectposition"  onClick={handlepositionchange}>
                <option>President</option>
                <option>Secretary</option>
                <option>Treasurer</option>
            </select>
            </div>
        </div>
        <div className="apprtoggle">
            <div>
                <text className='autonom'>Auto Approve All Nominations</text>
            </div>
            <div>
            <label class="switch">
                <input type="checkbox" onClick={approvehandler}/>
                <span class="slider round"></span>
            </label>
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Nomination Start Time:</text>
            </div>
            <div>
                <DateTimePicker
                datefor
                onChange={(date) => {
                    const d = new Date(date).toLocaleDateString('fr-FR');
                    console.log(d);
                    setNomStartData(d);
                    }}
                />
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Nomination End Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={handleNomEnd}/>
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Voting Start Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={handleVoteStart}/>
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Voting end Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={handleVoteEnd}/>
            </div>
        </div>
        <div className='btn-cont'>
            <div>
                <Button text='Cancel' OnClick={createElectionHandler}/>
            </div>
            <div>
                <Button text='Create' OnClick={() => {<Navigate to="/election"/>}}/>
            </div>
        </div>
    </>
  )
}




