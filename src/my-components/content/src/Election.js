import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../misc/Button'
import "../static/css/election.css"

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionNavbar from './miscElection/ElectionNavbar';

export default class Election extends Component{
    constructor (props) {
        super(props)
        this.state = {
          elections:[],
        };
        
        this.fetchElections = this.fetchElections.bind(this)
    };

    componentDidMount(){
      this.fetchElections()
    }
      
    fetchElections(){
      console.log("fetching...")

      fetch('http://127.0.0.1:8000/getAllElections')
      .then(response => response.json())
      .then(data =>
        this.setState({
          elections:data
        })
          
      );
      console.log("this state", this.state);
    }


  

render() {
  var elections = this.state.elections
  console.log(elections)
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
              <Button text="Create New" link = "/createelection" />
            </div> 
            :
            null
        }
        
    </div>
    <div>
      {elections.map(election=> {
            return( 
            <div className="elec-container" >
                <div className="elec-info">
                    <h5 className="elec-title">{election.phase}</h5>
                    <p className="elec-name"> {election.position} </p>
                    <p className="card-text"><small className="text-muted">Start Time {election.creation_time}</small></p>  
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