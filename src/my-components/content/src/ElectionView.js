import React from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import ElectionEnded from './ElectionEnded'
import ElectionNomination from './ElectionNomination'
import ElectionVoting from './ElectionVoting'
import ElectionDesc from './miscElection/ElectionDesc'

export default function ElectionView(props){


  return (
    <>
    <ElectionNavbar/>
    {
        props.elections[0].status.toLowerCase() === 'nomination'
        ?
        <ElectionNomination elections={props.elections} candidates={props.candidates}/>
        :
        props.elections[0].status.toLowerCase() === 'voting'
        ?
        <ElectionVoting elections={props.elections} candidates={props.candidates}/>
        :
        <ElectionEnded elections={props.elections} candidates={props.candidates}/>
    }
    
    </>
  )
}

