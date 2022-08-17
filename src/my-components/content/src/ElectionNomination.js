import React, { Component, useEffect } from 'react'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Button from '../../misc/Button'

export default function ElectionNomination(props) {

    let user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }

    async function handleNomination() {
        const name = user.username;
        const approval_status = "pending";
        const election_id = props.election.id;

        fetch("http://127.0.0.1:8000/createNominee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                approval_status: approval_status,
                election_id: election_id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("RESPONSE: ", data);
            alert("Nominee data submitted!");
        })
    }

    async function ApproveNomineeHandler(nominee_name, event){
        const name = nominee_name;
        const approval_status = "approved";
        const committee_election_id = props.election.id;

        fetch("http://127.0.0.1:8000/approveNominee", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({name: name,
                                approval_status: approval_status,
                                election_id: committee_election_id,
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.msg);
            if(data.success){
                window.location.reload();
            }
          });
    }

    function handleDeleteElection(){
        fetch(`http://127.0.0.1:8000/deleteElection/${props.election.id}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify()
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.msg);
            if(data.success){
                console.log("deleted!!");
                window.location.replace('/election')
            }
          });
    }
  

    return(
        <>
            <ElectionDesc election={props.election}/>
            <h3>Nominees: </h3>
        {props.candidates.map(candidate => {
            return(
                <>
                <div className="nomlistcontainer">
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                <div className="nom-info">
                    <h5 className="card-title">{candidate.owner_name}</h5>
                    <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor_no}{candidate.unit_no}</small></p>  
                </div> 
                {
                    props.user.userType === "admin"
                    ?
                    candidate.approval_status === "pending"
                    ?
                    <>
                        <div className='nom-btn'>
                            <Button text="Approve" OnClick = {(e) => {ApproveNomineeHandler(candidate.owner_name, e)}}/>
                        </div>
                        <div className='nom-btn'>
                            <Button text="Delete"/>
                        </div>  
                    </>
                    :
                    <>
                    <div></div>
                    <div>
                        {candidate.approval_status}
                    </div>  
                    </>
                    :
                    <>
                    <div></div>
                    <div>
                        {candidate.approval_status}
                    </div>  
                    </>
                }
                 
            </div>
            <hr/>
            
            </>
            )
        })}
        {
            props.user.userType === "admin"
            ?
            <>
            <div className='mybtn'>
                <div className='btn-can'>
                        <Button text="Cancel Election" OnClick={handleDeleteElection}/>
                </div>
                <div className='nom-btn'>
                    <Button text="Early Stop"/>
                </div> 
            </div>
            </>
            :
            <div className='mybtn'>
                <div></div>
                <div className='mynom'>
                    <Button className='btn btn-success' text={"Nominate yourself"} onClick={handleNomination} />                     
                </div> 
            </div>
        }

        </>
    )
}