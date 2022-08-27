import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from '../../../misc/Button'
import DateTimePicker from "react-datetime-picker";
import ElectionNavbar from "../election/miscElection/ElectionNavbar";
import "../../static/css/poll.css";
import '../../static/css/pollview.css'
import { GrAdd } from "react-icons/gr"; 

export default function PollCreate() {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [ topic, setTopic ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ startData, setStartData ] = useState(new Date());
  const [ endData, setEndData ] = useState(new Date());
  const [ optionAdded, setOptionAdded ] = useState(false);
  const [ options, setOptions ] = useState([]);


  function createPollHandler() {
    if(optionAdded){
      fetch(`http://127.0.0.1:8000/createPoll/${user.building}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
        description: description,
        startData: startData,
        endData: endData,
        options: options
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/election/poll");
        }
      });
    }
    
  }

  let navigate = useNavigate();

  function addOptions(e){
    setOptionAdded(false);
    const newVal = document.getElementById("optionButton").value;
    // add new element to js array
    setOptions([...options, newVal]);
    setOptionAdded(true)
    console.log(options);
  }

  function cancelHandler() {
    navigate("/election/poll");
  }

  return (
        <div>
          <ElectionNavbar />
          <h3> Create New Poll</h3>
          <div className="form-poll">
            <div className="topic-desc">
                <div>
                    <h5 className="pollname">Topic:</h5>
                </div>
                <div>
                    <input className="field1" type="text" name="name" onChange={(event)=>setTopic(event.target.value)}/>
                </div>
            </div>
            <div className="topic-desc">
                <div>
                    <h5 className="pollname">Description:</h5>
                </div>
                <div>
                    <input className="field2" type="text" name="name" onChange={(event)=>setDescription(event.target.value)}/>
                </div>
            </div>
          </div>

          <div className="startend">
            <div>
              <p className="settime">Voting Start Time:</p>
            </div>
            <div>
              <DateTimePicker onChange={setStartData} value={startData} />
            </div>
          </div>

          <div className="startend">
            <div>
              <p className="settime">Voting End Time:</p>
            </div>
            <div>
              <DateTimePicker onChange={setEndData} value={endData} />
            </div>
          </div>

          <div className="add-opt">
            <div className="opt">
              <h5> Options: </h5>
            </div>
              <div className="add-box">
                <input className="field3" id="optionButton" type="text" name="name"/>
                <Button text="Add" OnClick={addOptions}/>
              </div>
          </div>
          {options.map((option)=>{
            return(
              <div>
                <li className="option-list">{option}</li>
              </div>
            );
          })}
          

          <div className="btn-cont">
            <div>
              <Button text="Cancel" OnClick={cancelHandler} />
            </div>
            <div>
              <Button text="Create" OnClick={createPollHandler} />
            </div>
          </div>
        </div>
      
  );
}
