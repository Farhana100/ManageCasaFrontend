import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../misc/Button'
import '../static/css/committee.css';
import { useState } from 'react';

export default function CommitteeAdd(props) {
    let user = JSON.parse(localStorage.getItem("data"));
    if (!user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        };
    }
    const [positionData, setCommitteePosition] = useState("");
    const [ errormsg, setErrorMsg ] = useState('');

    function createPositionHandler(){
        console.log(positionData);
        fetch(`http://127.0.0.1:8000/createCommitteePosition/${user.building}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({position: positionData,
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.msg);
            if(data.success){
                navigate('/committee')
            }
            else{
              setErrorMsg(data.msg);
            }
          });
    }

    let navigate = useNavigate();

  return (
    <>
    <h3> New Member</h3>
    <hr className='mainline'/>
    <br/>
    {errormsg && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {errormsg}
        <button type="mybutton" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    }
    <form>
        <div class="form-group">
            <label for="inputdesignation">Designation</label>
            <input type="text" class="form-control" placeholder="Enter designation" onChange={(event) => setCommitteePosition(event.target.value)}  />
        </div>
    </form>
    <div className="add-btn">
        <Button  text="Add" OnClick={createPositionHandler}/>
    </div>
    </>
  )
}





