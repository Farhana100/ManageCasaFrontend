import React, { Component } from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Progress_bar from '../../misc/ProgressBar'

export default class ElectionEnded extends Component{
    constructor (props) {
        super(props)
        this.state = {
          
        };
        
    }

render() {
    return(
        <>
            <ElectionDesc elections={this.props.elections}/>
            <h3> Result:</h3>
        
            {this.props.candidates.map(candidate => {
            return(
                <>
                <div className="votelistcontainer">
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                    <div className="vote-info">
                        <h5 className="card-title">{candidate.name}</h5>
                        <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor}{candidate.unit}</small></p>  
                    </div> 
                    <div className='progbar'>
                    <Progress_bar bgcolor="#452954" progress='30'  height={15}/> 
                    </div>
                     <div className='votecnt'>
                     <text className='votecount'> 10/20</text>
                     </div>
                    
                </div>
            <hr/>
            
            </>
            )
        })}
        </>
    )
}
}