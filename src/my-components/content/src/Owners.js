import React, { Component } from 'react'
import '../static/css/owners.css'

export default class Owners extends Component {
  constructor (props) {
    super(props)
    this.state = {
     
    };
}

render(){
  return (
    <div className='owners'>
       <div className='container mycontainer'>
        <h3 className='owner-head'>List of Flat Owners</h3>
        {this.props.owners.map(owner=> {
                return(
                    <>
                    <div className='grid-container'>
                    <div className='grid-child-element'>
                        <img className='image' src={require('../static/images/nahian.jpg')}/>
                    </div>
                    <div className='grid-child-element'>
                    <div className='row myrow'>
                        <h5 className='owner-title'>{owner.name}</h5>
                        <p className='owner-text'> Apartment No. {owner.floor}{owner.unit}</p>
                        <p className='mobile'>Mobile No. {owner.phone_no}</p>
                    </div>
                    </div>
                    </div>
                    <hr/>
                    </>
                )
        })}
        </div>
    </div>
  
  )
}
}
