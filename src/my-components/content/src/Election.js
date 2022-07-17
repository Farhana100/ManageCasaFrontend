import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../misc/Button'
import "../static/css/election.css"

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
                        <Button text={"Select"} style={"width:40px"}/>
                    </div>       
                </div>
            </form>
        </div>
        <div className='new-btn'>
            <Button text="Create New"/>
        </div> 
    </div>
    
    </>
  )
}
}