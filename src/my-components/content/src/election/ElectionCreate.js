import React, { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../../misc/Button";
import DateTimePicker from "react-datetime-picker";
import ElectionNavbar from "./miscElection/ElectionNavbar";
import { useEffect } from "react";
import '../../static/css/election.css';

export default function ElectionCreate() {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [positions, setPositions] = useState({});
  const [positionData, setPositionData] = useState("");
  const [nomstartData, setNomStartData] = useState(new Date());
  const [nomendData, setNomEndData] = useState();
  const [votestartData, setVoteStartData] = useState();
  const [voteendData, setVoteEndData ] = useState();
  const [ autoapprove, setAutoApprove ] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

  const handlepositionchange = (e) => {
    setPositionData(e.target.value);
  };

  function getPositions() {
    fetch(`http://127.0.0.1:8000/getPositions/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPositions(data.positions);
          console.log(data.positions);
          setDataFetched(true);
        }
      });
  }

  function createElectionHandler() {
    fetch(`http://127.0.0.1:8000/createElection/${user.building}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        positionData: positionData,
        nomstartData: nomstartData,
        nomendData: nomendData,
        votestartData: votestartData,
        voteendData: voteendData,
        autoapprove: autoapprove,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/election");
        }
      });
  }

  let navigate = useNavigate();
  function cancelHandler() {
    navigate("/election");
  }

  useEffect(() => {
    getPositions();
    setIsLoading(false);
    console.log(positions);
  }, []);

  return (
    <>
      {!isLoading && datafetched ? (
        <div>
          <ElectionNavbar />
          <h3> Create New Committee Election</h3>
          <div className="form-elec">
            <div>
              <h5 className="elecname">Committee Member Position:</h5>
            </div>
            <div>
              <select
                className="elec-pos"
                id="selectposition"
                onClick={handlepositionchange}
              >
                {positions.map((pos) => {
                  return (
                    <>
                      <option>{pos['positions']}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="apprtoggle">
            <div>
                <p className='autonom'>Auto Approve All Nominations</p>
            </div>
            <div>
            <label className="switch">
                <input type="checkbox" onClick={(event) => setAutoApprove(event.target.value === "on"? true : false)}/>
                <span className="slider round"></span>
            </label>
            </div>
        </div>

          <div className="startend">
            <div>
              <p className="settime">Nomination Start Time:</p>
            </div>
            <div>
              <DateTimePicker onChange={setNomStartData} value={nomstartData} />
            </div>
          </div>

          <div className="startend">
            <div>
              <p className="settime">Nomination End Time:</p>
            </div>
            <div>
              <DateTimePicker onChange={setNomEndData} value={nomendData} />
            </div>
          </div>

          <div className="startend">
            <div>
              <p className="settime">Voting Start Time:</p>
            </div>
            <div>
              <DateTimePicker
                onChange={setVoteStartData}
                value={votestartData}
              />
            </div>
          </div>

          <div className="startend">
            <div>
              <p className="settime">Voting end Time:</p>
            </div>
            <div>
              <DateTimePicker onChange={setVoteEndData} value={voteendData} />
            </div>
          </div>
          <div className="btn-cont">
            <div>
              <Button text="Cancel" OnClick={cancelHandler} />
            </div>
            <div>
              <Button text="Create" OnClick={createElectionHandler} />
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
