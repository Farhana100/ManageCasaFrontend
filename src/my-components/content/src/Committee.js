import React, {Component} from 'react'
import Button from '../../misc/Button'
import '../static/css/committee.css';
import {Navigate} from "react-router-dom";


export default class Commitee extends Component{
    constructor (props) {
        super(props)
        this.state = {

        };
          
      }
    

render() {
  return (
    <div className='committee'>
       <div className='container'>
        <h3 className='committee_hd'>List of Current Committee Members</h3>
        {this.props.committee.map(committeemember=> {
            if(this.props.user.userType === 'admin') { 
                return( 
                <div className="flex-container">
                    <div className='fitem image'>
                          <img className='image' src={require('../static/images/nahian.jpg')}/>
                    </div>
                    <div className="fitem info">
                        <h5 className="card-title">{committeemember.name}</h5>
                        <p className="card-text">{committeemember.position}</p>
                        <p className="card-text"><small className="text-muted">Apartment No. {committeemember.floor}{committeemember.unit}</small></p>  
                    </div> 
                    <div className='fitem button'>
                        <Button text="Edit" OnClick={() => {<Navigate to="/addcommittee"/>}}/>
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
        {this.props.user.userType === 'admin'
            ?
            <div className='flex-end'>
                <Button text="Add New Committee Member" OnClick={() => {<Navigate to="/addcommittee"/>}}/>
            </div>
            :
            <div></div>
        }

        </div>
    </div>
  
  )
}
}

// export default function Committee(props){
//     let navigate = useNavigate();
//     return(
//         <CommiteeClass committee={props.committee} user={props.user} navigate={navigate}/>
//     )
// }
