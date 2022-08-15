import React, { Component } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'

export default class ElectionView extends Component{

  constructor (props) {
    super(props)
    this.state = {
      election:{},
    };
    this.fetchElection = this.fetchElection.bind(this)
  }

  componentDidMount(){
    this.fetchElection()
  }

  fetchElection(){
    console.log("fetching...")

    fetch('http://127.0.0.1:8000/getElection/1')
    .then(response => response.json())
    .then(data =>
      {
      this.setState({
        election:data
        
      })
      console.log(data)  
    }
    );
    
    console.log("this state");
  }


render(){
  var election = this.state.election;
  console.log('details', election.phase) 
  return (
    <>
    <ElectionNavbar/>
    {
        election.phase === 'nomination'
        ?
        <ElectionNomination election={election} candidates={this.props.candidates} user={this.props.user}/>
        :
        election.phase === 'voting'
        ?
        
        <ElectionVoting election={election} candidates={this.props.candidates} user={this.props.user}/>
        :
        <ElectionEnded election={election} candidates={this.props.candidates} user={this.props.user}/>
    }
    
    </>
  )
}
}

