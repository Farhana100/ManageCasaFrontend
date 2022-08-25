import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../misc/Button";
import "../../static/css/poll.css";
import ElectionNavbar from "../election/miscElection/ElectionNavbar";
import { useState, useEffect } from "react";

export default function PollList(props) {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [pollData, setPollData] = useState({});
  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function fetchPolls() {
    fetch(`http://127.0.0.1:8000/getAllPolls/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPollData(data);
        setDataFetched(true);
      });
  }

  useEffect(() => {
    fetchPolls();
    setIsLoading(false);
  }, []);



  return (
    <>
      {!isLoading && datafetched ? (
        <div>
          <ElectionNavbar />
          <div className="second-header">
            <div>
              {/* <form>
                <div className="calender">
                  <div className="datepicker">
                    <DatePicker
                      // selected={this.state.startDate}
                      // onChange={handleChange}
                      showTimeSelect
                      // timeFormat="HH:mm"
                      // timeIntervals={20}
                      // timeCaption="time"
                      dateFormat="MMMM, yyyy"
                    />
                  </div>
                  <div className="date-btn">
                    <Button text={"Select"} />
                  </div>
                </div>
              </form> */}
            </div>
            {user.userType === "admin" ? (
              <div className="new-btn">
                <Button text="Create New" link="/election/poll/create" />
              </div>
            ) : null}
          </div>
          <div>
            {pollData.map((poll) => {
              return (
                <a href={`/election/poll/view/${poll.id}`}>
                  <div className="poll-container">
                    <div className="poll-info">
                      <h5 className="poll-title">{poll.phase}</h5>
                      <p className="poll-name"> {poll.topic} </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Start Time {poll.creation_time}
                        </small>
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
