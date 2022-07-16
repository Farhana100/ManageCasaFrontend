import React from 'react'
import Button from '../../misc/Button'
import '../static/css/committee.css';

export default function Committee (props) {
  return (
    <>
    <h3> New Member</h3>
    <hr/>
    <br/>
    <form>
        <div class="form-group">
            <label for="inputdesignation">Designation</label>
            <input type="text" class="form-control" id="designationInput" placeholder="Enter designation"/>
        </div>
        <div class="form-group">
            <label for="FloorSelect">Floor</label>
            <select class="form-control" id="selectfloor">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <div class="form-group">
            <label for="UnitSelect">Unit</label>
            <select class="form-control" id="selectunit">
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
                    <input type="text" class="form-control" id="nameInput" placeholder="Enter name"/>
                </div>
                <div class="form-group">
                    <label for="InputApartment">Email</label>
                    <input type="email" class="form-control" id="emailInput" placeholder='Enter email'/>
                </div>
                <div class="form-group">
                    <label for="InputMobile">Mobile No.</label>
                    <input type="text" class="form-control" id="mobileInput" placeholder='Enter mobile'/>
                </div>
                <div className='btn-container'>
                    <div className='btn-cancel'>
                        <Button text="Cancel"/>
                    </div>
                    <div className='btn-add'>
                        <Button text="Add"/>
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
