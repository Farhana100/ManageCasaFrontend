import React from 'react'
import Button from '../../misc/Button'
import '../static/css/committee.css';
import {useNavigate} from "react-router-dom";


export default function Committee (props) {
    let navigate = useNavigate();

  return (
    <div className='committee'>
       <div className='container'>
        <h3 className='committee_hd'>List of Current Committee Members</h3>
        {props.committee.map(committeemember=> {
            if(props.user === 'admin') { 
                return( 
                <div className="flex-container">
                    <div className='fitem image'>
                          <img className='image' src={require('../static/images/nahian.jpg')}/>
                    </div>
                    <div className="fitem info">
                        <h5 className="card-title">{committeemember.name}</h5>
                        <p className="card-text">{committeemember.position}</p>
                        <p className="card-text"><small className="text-muted">Apartment No. {committeemember.floor}</small></p>  
                    </div> 
                    <div className='fitem button'>
                        <Button text="Edit"/>
                    </div>
                    <div className='fitem button'>
                        <Button text="Delete"/>
                    </div>   
                </div>
                )
            }
            else{
                return( 
                    <div className="fcontainer">
                        <div className='fitem image'>
                            <img className='notadminimage' src={require('../static/images/nahian.jpg')}/>
                        </div>
                        <div className="notadmininfo">
                            <h5 className="card-title">{committeemember.name}</h5>
                            <p className="card-text">{committeemember.position}</p>
                            <p className="card-text"><small className="text-muted">Apartment No. {committeemember.floor}</small></p>  
                        </div> 
                    </div>
                    )
            }
        })}
        {props.user === 'admin'
            ?
            <div className='flex-end'>
                <Button text="Add New Committee Member" OnClick={() => {navigate('/addcommittee');}}/>
            </div>
            :
            <div></div>
        }

        </div>
    </div>
  
  )
}
