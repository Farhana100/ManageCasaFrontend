import React, { Component, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import DateTimePicker from 'react-datetime-picker';
import ElectionNavbar from './miscElection/ElectionNavbar';


export default function ElectionCreate(props){
    const [ positionData, setPositionData ] = useState("");
    const [ nomstartData, setNomStartData ] = useState(new Date());
    const [ nomendData, setNomEndData ] = useState();
    const [ votestartData, setVoteStartData ] =useState();
    const [ voteendData, setVoteEndData ] = useState();
    
    const handlepositionchange = (e) => {
        setPositionData(e.target.value);
    }

    // function approvehandler(e){
    //     alert(`${e.target.checked}`)
    // }

    function createElectionHandler(){
        fetch("http://127.0.0.1:8000/createElection", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({positionData: positionData,
                                nomstartData: nomstartData,
                                nomendData: nomendData,
                                votestartData: votestartData,
                                voteendData: voteendData,
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.msg);
            if(data.success){
                navigate('/election')
            }
            
          });
    }

    let navigate = useNavigate();
    function cancelHandler(){
        navigate('/election')
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
        {/* <div className="apprtoggle">
            <div>
                <text className='autonom'>Auto Approve All Nominations</text>
            </div>
            <div>
            <label className="switch">
                <input type="checkbox" onClick={approvehandler}/>
                <span className="slider round"></span>
            </label>
            </div>
        </div> */}

        <div className="startend">
            <div>
                <text className='settime'>Nomination Start Time:</text>
            </div>
            <div>
                <DateTimePicker
                onChange={setNomStartData}
                value={nomstartData}
                />
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Nomination End Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={setNomEndData} value={nomendData}/>
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Voting Start Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={setVoteStartData} value={votestartData}/>
            </div>
        </div>

        <div className="startend">
            <div>
                <text className='settime'>Voting end Time:</text>
            </div>
            <div>
                <DateTimePicker onChange={setVoteEndData} value={voteendData}/>
            </div>
        </div>
        <div className='btn-cont'>
            <div>
                <Button text='Cancel' OnClick={cancelHandler}/>
            </div>
            <div>
                <Button text='Create' OnClick={createElectionHandler}/>
            </div>
        </div>
    </>
  )
}




