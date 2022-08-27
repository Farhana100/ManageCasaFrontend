import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/serviceProviders.css'
import Button from '../../../misc/Button'

export default function ServicePackage({title, description, fee, subscription_duration, subscribed, canSubscribe, buttonLink}){

  return (
    <>
        <div className="card mh-25">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Subscription Duration:</b> {subscription_duration}</li>
                <li className="list-group-item"><b>Fee:</b> {fee}</li>
            </ul>
            {canSubscribe &&
                <>
                {subscribed &&
                    <div className='text-center'><a className="btn mb-0 mybutton btn-block" onClick={buttonLink}>unsubscribe</a></div>
                }
                {!subscribed &&
                    <div className='text-center'><a className="btn mb-0 mybutton btn-block" onClick={buttonLink}>subscribe</a></div>
                }
                </>
            }
        </div>
    </>
  )
}

ServicePackage.defaultProps = {
    service_provider: '',
    title: '',
    description: '',
    fee: 0,
    subscription_duration: '',
    buttonLink: '#',
    subscribed: false,
    canSubscribe: false
}

ServicePackage.propTypes = {
    service_provider: PropTypes.string,
    buttonLink: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    fee: PropTypes.number,
    subscription_duration: PropTypes.string,
    subscribed: PropTypes.bool,
    canSubscribe: PropTypes.bool
}