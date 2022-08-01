import React, { Component } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'
import ElectionDesc from './miscElection/ElectionDesc'

export default class ElectionView extends Component{

  constructor (props) {
    super(props)
    this.state = {
      
    };
    
}


render(){
  return (
    <>
    <ElectionNavbar/>
    {
        this.props.elections[0].status.toLowerCase() === 'nomination'
        ?
        <ElectionNomination elections={this.props.elections} candidates={this.props.candidates} user={this.props.user}/>
        :
        this.props.elections[0].status.toLowerCase() === 'voting'
        ?
        <ElectionVoting elections={this.props.elections} candidates={this.props.candidates} user={this.props.user}/>
        :
        <ElectionEnded elections={this.props.elections} candidates={this.props.candidates} user={this.props.user}/>
    }
    
    </>
  )
}
}

