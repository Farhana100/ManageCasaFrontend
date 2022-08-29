import React, { Component } from "react";
import "../../../static/css/electionview.css";
import "../../../static/css/election.css";
import { FiEdit } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../misc/Button";
import DateTimePicker from "react-datetime-picker";

export default function ElectionDesc(props) {
  const splitList = window.location.href.split('/');
  const electionId = splitList[splitList.length - 1];

  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }
  const [ electionData, setElectionData ] = useState({});

  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ isClicked, setIsClicked ] = useState(false);

  const [nomstartData, setNomStartData] = useState(new Date());
  const [nomendData, setNomEndData] = useState();
  const [votestartData, setVoteStartData] = useState();
  const [voteendData, setVoteEndData] = useState();

  let autoApprove = false;
  let autoapprove = false;

  function fetchelectiondata(){
    fetch(`http://127.0.0.1:8000/getElection/${electionId}`)
    .then(response => response.json())
    .then((data) => {
        setElectionData(data);
        
    });
}

  function getAutoApproval() {
    fetch(`http://127.0.0.1:8000/getAutoApprove/${electionId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) autoApprove = data.autoapprove;
        setDataFetched(true);
        // console.log(autoApprove);
      });
  }

  function approvehandler(e) {
    if (e.target.checked) autoapprove = true;
    else autoapprove = false;
    fetch(`http://127.0.0.1:8000/updateAutoApprove/${electionId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        autoapprove: autoapprove,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(`/election/view/${electionId}`);
        }
      });
  }

  // function savehandler(){
  //   console.log("saved");
  //   setIsClicked(false);
  //   console.log("clicked?", isClicked.current);
  //   fetch(`http://127.0.0.1:8000/updatenomstart/${electionId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       nomstart: nomstartData,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         navigate(`/election/view/${electionId}`);
  //       }
  //     });  
  // }

  // function editHandler() {
  //   console.log("clicked");
  //   setIsClicked(true);
  //   console.log("is clicked: ", isClicked)
  // }

  let navigate = useNavigate();

  useEffect(() => {
    fetchelectiondata();
    getAutoApproval();
    setIsLoading(false);
  }, []);


  return (
    <>
      {!isLoading && datafetched ? (
        <div>
          <div className="desc-header">
            <div>
              <h3>Committee Election</h3>
            </div>
            <div>
              <p className="status"> {electionData.phase} </p>
            </div>
          </div>
          <h5 className="myh5">
            {" "}
            Committee Member Position: {electionData.position}
          </h5>
          {user.userType === "admin" ? (
            electionData.phase.toLowerCase() === "nomination" ? (
              <div className="apprtoggle">
                <div>
                  <p className="autonom">Auto Approve All Nominations</p>
                </div>
                <div>
                  <label className="switch">
                    {electionData.autoapprove ? 
                    <input type="checkbox" checked="checked" onClick={approvehandler} />
                    :
                    <input type="checkbox" onClick={approvehandler} />
                    }
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            ) : null
          ) : null}
          <div className="count">
            <p> Total Number of Voters: {electionData.vote_count}</p>
          </div>

          <div className="timeinfo">
            <div>
              <p className="timename">Nomination Start Time:</p>
            </div>
            <div>
            <p className="timev1">
                {electionData.nomination_start_time}
            </p>
            </div>
            
            {/* {user.userType === "admin" && electionData.phase.toLowerCase() != "ended" ? (
              isClicked ? (
                <div className="afterclick">
                  <div>
                    <DateTimePicker onChange={setNomStartData} value={nomstartData}/>
                  </div>
                  <div>
                    <Button text={"Save"} OnCLick={savehandler}/>
                  </div>
                </div>
              ) : (
                <div className="edit-time">
                  <div>
                    <p className="timev1">
                      {electionData.nomination_start_time}
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
              <p className="timename">Nomination End Time:</p>
            </div>
            <div>
              <p className="timev2">{electionData.nomination_end_time}</p>
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
          <div className="timeinfo">
            <div>
              <p className="timename">Voting Start Time:</p>
            </div>
            <div>
              <p className="timev3">{electionData.voting_start_time}</p>
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
          <div className="timeinfo">
            <div>
              <p className="timename">Voting End Time:</p>
            </div>
            <div>
              <p className="timev4">{electionData.voting_end_time}</p>
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
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
