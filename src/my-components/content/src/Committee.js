import React, { Component } from "react";
import Button from "../../misc/Button";
import "../static/css/committee.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Commitee(props) {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [committeeData, setCommitteeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

  function fetchCommitteeMembers() {
    fetch(`http://127.0.0.1:8000/getCommitteeMembers/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.data);
          setCommitteeData(data.data);
          setDataFetched(true);
        }
      });
  }

  useEffect(() => {
    fetchCommitteeMembers();
    setIsLoading(false);
  }, []);

  return (
    <>
      {user.userType === "admin" ? (
        <div className="flex-end">
          <Button text={'Add New Position'} link={'/committee/add'} />
        </div>
      ) : (
        <div></div>
      )}
      {!isLoading && datafetched ? (
        <div className="committee">
          <div className="container">
            {/* <h3 className="committee_hd">List of Current Committee Members</h3> */}
            {committeeData.map((committeemember) => {
              return (
                <>
                <div className="flex-container">
                  <div className="fitem image">
                    <img
                      className="image"
                      src={"http://127.0.0.1:8000" + committeemember.image}
                    />
                  </div>
                  <div className="fitem info">
                    <h5 className="card-title">{committeemember.owner_name}</h5>
                    <p className="card-text">{committeemember.position}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Apartment No. {committeemember.floor_no}
                        {committeemember.unit_no}
                      </small>
                    </p>
                  </div>
                </div>
                <hr />
                </>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
