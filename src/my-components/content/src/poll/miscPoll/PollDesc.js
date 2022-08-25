import React, { Component } from "react";
import "../../../static/css/pollview.css";
import "../../../static/css/poll.css";
import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../misc/Button";
import DateTimePicker from "react-datetime-picker";

export default function PollDesc(props) {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  return (
        <div>
          <div className="desc-header">
            <div>
              <h3>Poll</h3>
            </div>
            <div>
              <p className="status"> {props.poll.phase} </p>
            </div>
          </div>
          <h5 className="myh5">
            {" "}
            Topic: {props.poll.topic}
          </h5>
          <p className="desc">
            Description: {props.poll.description}
          </p>
          <div className="count">
            <p> Total Number of Voters: {props.poll.vote_count}</p>
          </div>

          <div className="timeinfo">
            <div>
              <p className="timename">Poll Start Time:</p>
            </div>
            <div>
            <p className="timev1">
                {props.poll.start_time}
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
              <p className="timev2">{props.poll.end_time}</p>
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
  );
}
