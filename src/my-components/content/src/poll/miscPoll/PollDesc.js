import React from "react";
import "../../../static/css/pollview.css";
import "../../../static/css/poll.css";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../../misc/Button";
import DateTimePicker from "react-datetime-picker";

export default function PollDesc(props) {
  const splitList = window.location.href.split("/");
  const pollId = splitList[splitList.length - 1];

  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [ pollData, setPollData ] = useState({});
  const [ datafetched, setDataFetched ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  function fetchPoll(){
    fetch(`http://127.0.0.1:8000/getPoll/${pollId}`)
    .then(response => response.json())
    .then(data =>
      {
        setPollData(data); 
        setDataFetched(true);
    });
  }

  useEffect(() => {
    fetchPoll();
    setIsLoading(false);
  }, []);

  return (
    <>
    {
      !isLoading && datafetched ? (
        <div>
          <div className="desc-header">
            <div>
              <h3>Poll</h3>
            </div>
            <div>
              <p className="status"> {pollData.phase} </p>
            </div>
          </div>
          <h5 className="myh5">
            {" "}
            Topic: {pollData.topic}
          </h5>
          <p className="desc">
            Description: {pollData.description}
          </p>
          <div className="count">
            <p> Total Number of Voters: {pollData.vote_count}</p>
          </div>

          <div className="timeinfo">
            <div>
              <p className="timename">Poll Start Time:</p>
            </div>
            <div>
            <p className="timev1">
                {pollData.start_time}
            </p>
            </div>
            
            {/* {user.userType === "admin" ? (
              isClicked ? (
                <div className="afterclick">
                  <div>
                    <DateTimePicker onChange={setNomStartData} value={nomstartData}/>
                  </div>
                  <div>
                    <Button text={"Save"} onCLick={savehandler}/>
                  </div>
                </div>
              ) : (
                <div className="edit-time">
                  <div>
                    <p className="timev1">
                      {props.election.nomination_start_time}
                    </p>
                  </div>
                  <div className="icon-area">
                    <FiEdit
                      size={25}
                      className="edit-icon"
                      onClick={editHandler}
                    />
                  </div>
                </div>
              )
            ) : null} */}
          </div>

          <div className="timeinfo">
            <div>
              <p className="timename">Poll End Time:</p>
            </div>
            <div>
              <p className="timev2">{pollData.end_time}</p>
            </div>
            {/* {
                user.userType === "admin"
                ?
                <div className='icon-area'>
                    <FiEdit size={25} className='edit-icon'/>
                </div>
                :
                null
            } */}
          </div>
        </div>
  )
    :
    
    <div>Loading...</div>
  }
    </>
)
}
