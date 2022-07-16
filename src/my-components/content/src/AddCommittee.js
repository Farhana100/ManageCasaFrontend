import React, { Component } from 'react'
import Button from '../../misc/Button'
import '../static/css/committee.css';

export default class AddCommittee extends Component{
    constructor(props){
        super(props);
        this.state = {
            designation: '',
            floor: '',
            unit: '',
            name: '',
            email: '',
            phone: ''
        }
    }

    handledesignationChange = (e) => {
        this.setState({
            designation: e.target.value
        })
    }
    handlenameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleemailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlephoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    handlefloorchange = (e) => {
        this.setState({
            floor: e.target.value
        })
    }
    handleunitchange = (e) => {
        this.setState({
            unit: e.target.value
        })
    }


    render(){
  return (
    <>
    <h3> New Member</h3>
    <hr/>
    <br/>
    <form>
        <div class="form-group">
            <label for="inputdesignation">Designation</label>
            <input type="text" class="form-control" id="designationInput" placeholder="Enter designation" value={this.state.designation} onChange={this.handledesignationChange}/>
        </div>
        <div class="form-group">
            <label for="FloorSelect">Floor</label>
            <select class="form-control" id="selectfloor" value={this.state.floor} onChange={this.handlefloorchange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <div class="form-group">
            <label for="UnitSelect">Unit</label>
            <select class="form-control" id="selectunit" value={this.state.unit} onChange={this.handleunitchange}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
        </div>
    </form>
    <br/>
    <h4> Personal Information</h4>
    <br/>
    <div className='my-form-container'>
        <div className='forminfo'>
            <form>
                <div class="form-group">
                    <label for="inputname">Name</label>
                    <input type="text" class="form-control" id="nameInput" placeholder="Enter name" value={this.state.name} onChange={this.handlenameChange}/>
                </div>
                <div class="form-group">
                    <label for="InputApartment">Email</label>
                    <input type="email" class="form-control" id="emailInput" placeholder='Enter email' value={this.state.email} onChange={this.handleemailChange}/>
                </div>
                <div class="form-group">
                    <label for="InputMobile">Mobile No.</label>
                    <input type="text" class="form-control" id="mobileInput" placeholder='Enter mobile' value={this.state.phone} onChange={this.handlephoneChange}/>
                </div>
                <div className='btn-container'>
                    <div className='btn-cancel'>
                        <Button text="Cancel"/>
                    </div>
                    <div className='btn-add'>
                        <Button text="Add" OnClick={() => alert(`${this.state.designation} ${this.state.floor} ${this.state.unit} ${this.state.name} ${this.state.email} ${this.state.phone}`)} />
                    </div>
                </div>
            </form>
        </div>
        <div>
            <img className='formimage' src={require('../static/images/default_upload.png')}/>
            <br/>
            <Button text="Add Photo"/>
        </div>
    </div>
    </>
  )
}
}




