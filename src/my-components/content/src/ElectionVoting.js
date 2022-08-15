import React, { Component } from 'react'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Button from '../../misc/Button'
import Progress_bar from '../../misc/ProgressBar'

export default class ElectionVoting extends Component{
    constructor (props) {
        super(props)
        this.state = {
         
        };
        
    }

render(){
    return(
        <>
            <ElectionDesc election={this.props.election}/>
            <h3>Candidates:</h3>
        
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
                    {
                        this.props.user === "admin"
                        ?
                        <>
                        <div className='progbar'>
                            <Progress_bar bgcolor="#452954" progress='30'  height={15}/> 
                        </div>
                        <div className='votecnt'>
                            <text className='votecount'> 10</text>
                        </div>
                        </>
                        :
                        <div class="voteradio">
                            <input class="vote-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        </div>
                    }
                    
                    
                </div>
            <hr/>
            
            </>
            )
        })}
        {
            this.props.user === "admin"
            ?
            <>
                <div className='mybtn'>
                    <div className='btn-can'>
                        <Button text="Cancel Election"/>
                    </div>
                    <div className='nom-btn'>
                        <Button text="Early Stop"/>
                    </div> 
                </div>
            </>
            :
            <div className='mybtn'>
                    <div></div>
                    <div className='myvote'>
                        <Button text="Vote" OnClick={() => {alert(`${"You have succesfully casted your vote"}`)}}/>
                    </div> 
                </div>
        }
        
        </>
    )
}
}