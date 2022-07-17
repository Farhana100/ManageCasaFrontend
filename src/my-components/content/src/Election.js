import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../misc/Button'
import "../static/css/election.css"

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

class ElectionClass extends Component{
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

      showdetailshandler(e){
        alert(`${"hoise"}`)
        this.props.navigate('/viewelection');
      }


render() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="nav-item nav-link elec" href="#">Election</a>
        <a class="nav-item nav-link poll" href="#">Poll</a>
    </nav>
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
        <div className='new-btn'>
            <Button text="Create New" OnClick={() => {this.props.navigate('/createelection');}}/>
        </div> 
    </div>
    <div>
      {this.props.elections.map(election=> {
            return( 
            <div className="elec-container" >
                <div className="elec-info" onClick={this.showdetailshandler}>
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

export default function Election(props){
  let navigate = useNavigate();
  return(
      <ElectionClass elections={props.elections} navigate={navigate}/>
  )
}