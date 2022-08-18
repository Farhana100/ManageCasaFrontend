import React from 'react'
import PropTypes from 'prop-types'
import NoneImg from '../../static/images/noneImage.png'

export default function ApartmentCard({apartment_number, owner, tenant, imageLink, detailsLink}){
  console.log(imageLink);
  if (imageLink) {
    imageLink = 'http://127.0.0.1:8000' + imageLink 
  }
  else{
    imageLink = NoneImg
  }

  return (
    <>
      <div className="card card-inverse mh-25">
        <img className="card-img-top my-apartment-card-image" src={imageLink} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{apartment_number}</h5>
          <p className="card-text">
            <b>Owner: </b> {owner}
            {!tenant &&  (
              <><br/><br/></>
            )}
            {tenant &&  (
              <><br/>
              <b>Tenant: </b> {tenant}</>
            )}
          </p>
        </div>
        
        <div className='text-center'><a className="btn mb-0 mybutton btn-block" href={detailsLink}>see more</a></div>
        {/* <div className='text-center'><a className="btn mb-0 mybutton btn-block" href={detailsLink} onClick={loadApartmentPage}>see more</a></div> */}
      </div>
    </>
  )
}

ApartmentCard.defaultProps = {
  apartment_number: 'unknown',
  imageLink: NoneImg,
  detailsLink: '#',
  owner: null,
  tenant: null,
}

ApartmentCard.propTypes = {
  apartment_number: PropTypes.string,
  imageLink: PropTypes.string,
  detailsLink: PropTypes.string,
  owner: PropTypes.string,
  tenant: PropTypes.string,
}