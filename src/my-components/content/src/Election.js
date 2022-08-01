import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import { Navigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../misc/Button'
import "../static/css/election.css"

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionNavbar from './miscElection/ElectionNavbar';

export default class Election extends Component{
    constructor (props) {
        super(props)
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        
    }
      handleChange(date) {
        this.setState({
          startDate: date
        })
      }
      onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
      }


render() {
  return (
    <>
    <ElectionNavbar/>
    <div className='second-header'>
        <div>
            <form>
                <div className="calender">
                    <div className='datepicker'>
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                            showTimeSelect
                            // timeFormat="HH:mm"
                            // timeIntervals={20}
                            // timeCaption="time"
                            dateFormat="MMMM, yyyy"
                        />
                    </div>
                    <div className='date-btn'>
                        <Button text={"Select"}/>
                    </div>       
                </div>
            </form>
        </div>
        {
            this.props.user.userType === 'admin' 
            ?
            <div className='new-btn'>
              <Button text="Create New" OnClick={() => {<Navigate to="/createelection" replace={true}/>}}/>
            </div> 
            :
            null
        }
        
    </div>
    <div>
      {this.props.elections.map(election=> {
            return( 
            <div className="elec-container" >
                <div className="elec-info" onClick={() => {<Navigate to="/viewelection"/>}}>
                    <h5 className="elec-title">{election.status}</h5>
                    <p className="elec-name">{election.name}</p>
                    <p className="card-text"><small className="text-muted">Start Time {election.create_time}</small></p>  
                </div>    
            </div>
            )
       })}
        
    </div>
    </>
  )
}
}

// export default function Election(props){
//   let navigate = useNavigate();
//   return(
//       <ElectionClass elections={props.elections} navigate={navigate} user={props.user}/>
//   )
// }