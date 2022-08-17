import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../misc/Button";
import "../static/css/election.css";

import ElectionNavbar from "./miscElection/ElectionNavbar";

import { useState, useEffect } from "react";

export default function Election(props){
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    }
  }

  const [ electionData, setElectionData ] = useState({});
  const [ datafetched, setDataFetched ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  function fetchElections() {
    fetch("http://127.0.0.1:8000/getAllElections")
      .then((response) => response.json())
      .then((data) => {
          setElectionData(data);
          setDataFetched(true);
      });
  }

  useEffect(() => {
    fetchElections();
    setIsLoading(false);
  }, []);

  let navigate = useNavigate();

  function handleClick(){
    navigate("/viewelection");
  };

  
    return (
      <>
      {
        !isLoading && datafetched
        ?
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
                <Button text="Create New" link="/createelection" />
              </div>
            ) : null}
          </div>
          <div>
            {electionData.map((election) => {
              return (
                <a href={`/viewelection/${election.id}`}>
                  <div className="elec-container">
                    <div className="elec-info">
                      <h5 className="elec-title">{election.phase}</h5>
                      <p className="elec-name"> {election.position} </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Start Time {election.creation_time}
                        </small>
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
        :
        <div> Loading... </div>    
    
      }
      </>
    );
  }
