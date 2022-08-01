import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Button from '../../misc/Button';
import DateTimePicker from '../../misc/DateTimePicker';
import ElectionNavbar from './miscElection/ElectionNavbar';


export default class ElectionCreate extends Component{
    
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

   handlepositionchange(e){
        alert(`${e.target.value}`)
   }

   approvehandler(e){
    alert(`${e.target.checked}`)
   }


render(){
  return (
    <>
        <ElectionNavbar/>
        <h3> Create New Committee Election</h3>
        <div class="form-elec">
            <div>
                <h5 className='elecname'>Committee Member Position:</h5>
            </div>
            <div>
            <select class="elec-pos" id="selectfloor" value={this.state.floor} onChange={this.handlepositionchange}>
                <option>President</option>
                <option>Secretary</option>
                <option>Treasurer</option>
            </select>
            </div>
        </div>
        <div class="apprtoggle">
            <div>
                <text className='autonom'>Auto Approve All Nominations</text>
            </div>
            <div>
            <label class="switch">
                <input type="checkbox" onClick={this.approvehandler}/>
                <span class="slider round"></span>
            </label>
            </div>
        </div>

        <div class="startend">
            <div>
                <text className='settime'>Nomination Start Time:</text>
            </div>
            <div>
                <DateTimePicker/>
            </div>
        </div>

        <div class="startend">
            <div>
                <text className='settime'>Nomination End Time:</text>
            </div>
            <div>
                <DateTimePicker/>
            </div>
        </div>

        <div class="startend">
            <div>
                <text className='settime'>Voting Start Time:</text>
            </div>
            <div>
                <DateTimePicker/>
            </div>
        </div>

        <div class="startend">
            <div>
                <text className='settime'>Voting end Time:</text>
            </div>
            <div>
                <DateTimePicker/>
            </div>
        </div>
        <div className='btn-cont'>
            <div>
                <Button text='Cancel' OnClick={() => {<Navigate to="/election"/>}}/>
            </div>
            <div>
                <Button text='Create' OnClick={() => {<Navigate to="/election"/>}}/>
            </div>
        </div>
    </>
  )
}
}

// export default function ElectionCreate(props){
//     let navigate = useNavigate();
//     return(
//         <ElectionCreateClass elections={props.elections} navigate={navigate}/>
//     )
//   }




