import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../misc/Button'

function loadApartmentPage(e) {
  e.preventDefault();
  console.log('apartment test 1');
}

export default function ApartmentCard({apartment_number, owner, tenant, imageLink, detailsLink}){
  return (
    <>
      <div className="card card-inverse my-apartment-card mh-25">
        <img className="card-img-top" src={imageLink} alt="Card image cap"/>
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
  imageLink: 'https://www.mountsinai.on.ca/wellbeing/images/image-placeholder/image',
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