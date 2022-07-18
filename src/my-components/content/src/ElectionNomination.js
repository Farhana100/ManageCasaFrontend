import React from 'react'
import ElectionNavbar from './miscElection/ElectionNavbar'
import '../static/css/electionview.css'
import ElectionDesc from './miscElection/ElectionDesc'
import Button from '../../misc/Button'
import { useNavigate } from 'react-router-dom'

export default function ElectionNomination(props){
    let navigate = useNavigate();
    return(
        <>
            <ElectionDesc elections={props.elections}/>
            <h3>Nominees: </h3>
        {props.candidates.map(candidate => {
            return(
                <>
                <div className="nomlistcontainer">
                {/* <div className='nom-image'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                </div> */}
                <div className="nom-info">
                    <h5 className="card-title">{candidate.name}</h5>
                    <p className="card-text"><small className="text-muted">Apartment No. {candidate.floor}{candidate.unit}</small></p>  
                </div> 
                {
                    props.user === "admin"
                    ?
                    <>
                    <div className='nom-btn'>
                        <Button text="Approve"/>
                    </div>
                    <div className='nom-btn'>
                        <Button text="Delete"/>
                    </div>  
                    </>
                    :
                    <>
                    <div></div>
                    <div>
                        {candidate.status}
                    </div>  
                    </>
                }
                 
            </div>
            <hr/>
            
            </>
            )
        })}
        {
            props.user === "admin"
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
                <div className='mynom'>
                    <Button text="Nominate Yourself" OnClick={() => {alert(`${"you have nominated yourself"}`);}}/>
                                                                            
                </div> 
            </div>
        }

        </>
    )
}