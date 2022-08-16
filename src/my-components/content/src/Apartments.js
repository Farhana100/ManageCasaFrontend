import React, { Component } from 'react'
import ApartmentCard from './ApartmentCard';

export default class Apartments extends Component {

  constructor (props) {
    super(props)
    this.state = {
      
    };
    
  }

  render(){
    return (
      <>
        <div className="container-fluid">

          <div className='h4'>Floor no. : 1</div>
          <hr/>

          <div className="row mb-4">
            <div className="col-sm-3 mb-2"><ApartmentCard tenant={'Farhana'} owner={'Farhana'}/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
          </div>

          <div className='h4'>Floor no. : 2</div>
          <hr/>

          <div className="row mb-4">
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
          </div>

          <div className='h4'>Floor no. : 3</div>
          <hr/>

          <div className="row mb-4">
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
            <div className="col-sm-3 mb-2"><ApartmentCard/></div>
          </div>

        </div>
      </>
    )
  }
}
