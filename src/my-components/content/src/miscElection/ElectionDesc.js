import React, { Component } from 'react'
import '../../static/css/electionview.css'
import '../../static/css/election.css'
import {FiEdit} from 'react-icons/fi';

export default class ElectionDesc extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    approvehandler(e){
        alert(`${e.target.checked}`)
    }


    render(){
    return(
        <>
        <div className='desc-header'>
            <div>
                <h3>Committee Election</h3>
            </div>
            <div>
                <text className='status'> {this.props.elections[0].status} </text>
            </div>
        </div>
        <h5 className='myh5'> Committee Member Position: {this.props.elections[0].name}</h5>
        {
            this.props.elections[0].status.toLowerCase() === 'nomination'
            ?
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
            :
            <div className='count'>
                <p>Total Number of Voters: voters</p>
                <p> Total Number of Participants: participants</p>
            </div>
        }
        <div class="timeinfo">
            <div>
                <p className='timename'>Nomination Start Time:</p>
            </div>
            <div>
                <p className='timev1'>{this.props.elections[0].nom_start_time}</p>
            </div>
            <div className='icon-area'>
                <FiEdit size={25} className='edit-icon'/>
            </div>
        </div>
        <div class="timeinfo">
            <div>
                <p className='timename'>Nomination End Time:</p>
            </div>
            <div>
                <p className='timev2'>{this.props.elections[0].nom_end_time}</p>
            </div>
            <div className='icon-area'>
                <FiEdit size={25} className='edit-icon'/>
            </div>
        </div>
        <div class="timeinfo">
            <div>
                <p className='timename'>Voting Start Time:</p>
            </div>
            <div>
                <p className='timev3'>{this.props.elections[0].voting_start_time}</p>
            </div>
            <div className='icon-area'>
                <FiEdit size={25} className='edit-icon'/>
            </div>
        </div>
        <div class="timeinfo">
            <div>
                <p className='timename'>Voting End Time:</p>
            </div>
            <div>
                <p className='timev4'>{this.props.elections[0].voting_end_time}</p>
            </div>
            <div className='icon-area'>
                <FiEdit size={25} className='edit-icon'/>
            </div>
        </div>
        </>
    )
}
}