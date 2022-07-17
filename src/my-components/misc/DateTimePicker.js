import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class DateTimePicker extends Component{
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
    
render(){
    return (
        <div>
            <form>
                <div className="calender">
                    <div className='datepicker'>
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={20}
                            timeCaption="time"
                            dateFormat="MMMM, d, yyyy h:mm a"
                        />
                    </div>       
                </div>
            </form>
        </div>
    )
    }
}