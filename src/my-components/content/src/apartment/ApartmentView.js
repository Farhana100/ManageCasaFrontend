import React, { Component } from 'react'
import test_img from '../../static/images/test.svg'

export default class ApartmentView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      // building
      // owner
      // tenant
      // floor_number
      // apartment_number
      // rent
    };
    
  }

  render(){
    return (
      <>
        <div className="container-fluid">
        <div className="row">

{/* -------------------------------------------------------- apartment images start ---------------------------------------------------- */}
          <div className="col-8">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src={test_img} alt="First slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={test_img} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={test_img} alt="Third slide"/>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
{/* -------------------------------------------------------- apartment images end ---------------------------------------------------- */}


{/* ----------------------------------------------------- apartment description start -------------------------------------------------*/}
          <div className="col-4">
            <p className='h4'>apartmentName</p>
            building
            owner
            tenant
            floor_number
            apartment_number
            rent

          </div>
{/* ----------------------------------------------------- apartment description end -------------------------------------------------*/}
        </div>
        </div>
      </>
    )
  }
}
