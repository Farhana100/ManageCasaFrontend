import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'


/*

const fullUrl = window.location.href;
"http://localhost:2000/election/22"

const url


*/


export default class ElectionView extends Component{
  constructor (props) {
    
    super(props)
    this.state = {
      election:{},
      nominees:{},
    };

    this.data_loaded = false;
    this.fetchElection = this.fetchElection().bind(this)
    this.fetchNominee = this.fetchNominee.bind(this)
  }

  componentDidMount(){
    if (this.data_loaded === false){
      this.fetchElection();
      this.fetchNominee();
    }
    
  }

  fetchElection(){
    console.log("fetching...");

    // const splitList = window.location.href.split("/");
    // const electtionId = splitList[splitList.length - 1];
    // console.log("Election id:", electtionId);

    fetch(`http://127.0.0.1:8000/getElection/2`)
    .then(response => response.json())
    .then(data =>
      {
      this.setState({
        election:data
        
      })
      this.data_loaded = true;
      console.log("data:", data)  
    }
    );
    
    console.log("this state");
  }

  fetchNominee(){
    console.log("fetching...")

    fetch('http://127.0.0.1:8000/getNominees/1')
    .then(response => response.json())
    .then(data =>
      {
      this.setState({
        nominees:data
      })
      this.data_loaded = true;
      console.log("data:", data)  
    }
    );
    
  }


render(){
  var election = this.state.election;
  var nominees = this.state.nominees;
  console.log('details', election); 
  console.log('nominee dets:', nominees);
  
  console.log(this.props);

  return (
    this.data_loaded ? (
    <>
    <ElectionNavbar/>
    {
        election.phase === 'nomination'
        ?
        <ElectionNomination election={election} candidates={nominees} user={this.props.user}/>
        :
        election.phase === 'voting'
        ?
        <ElectionVoting election={election} candidates={nominees} user={this.props.user}/>
        :
        election.phase === 'ended'
        ?
        <ElectionEnded election={election} candidates={nominees} user={this.props.user}/>
        :
        null
    }
    
    </>
    ) 
    :
    <div>Loading...</div>
  )
}
}

