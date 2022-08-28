import React from 'react'
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types'
import '../../static/css/serviceProviders.css'
import Button from '../../../misc/Button'

export default function ServicePackage({pk, user_pk, title, description, fee, subscription_duration, subscribed, canSubscribe, subscriptionHandler, userType}){

    let navigate = useNavigate();
    return (
    <>
        <div className="card service-provider-card">
            {userType === 'admin' &&
                <div className='card-header p-0'>
                    <div className='text-right'><a className="btn mybutton" 
                    onClick={() => {
                        fetch("http://127.0.0.1:8000/deleteServicePackage", {
                            method: 'POST',
                            headers: {
                            'Content-type':'application/json',
                            },
                            body: JSON.stringify({
                                pk: pk,
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            
                            console.log(data);
                            if(data.success){
                                window.location.reload();
                            }
                            else {
                                console.log(data.msg);
                            }
                        });
                    }}>delete</a></div>
                </div>
            }
            
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Subscription Duration:</b> {subscription_duration} month</li>
                <li className="list-group-item"><b>Fee:</b> {fee} tk</li>
            </ul>
            {canSubscribe &&
                <>
                {subscribed &&
                    <div className='text-center'><a className="btn mb-0 mybutton btn-block" 
                    onClick={() => {
                        fetch("http://127.0.0.1:8000/unsubscribePackage", {
                            method: 'POST',
                            headers: {
                            'Content-type':'application/json',
                            },
                            body: JSON.stringify({
                                package_pk: pk,
                                user_pk: user_pk,
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            
                            console.log(data);
                            if(data.success){
                                window.location.reload();
                            }
                            else {
                                console.log(data.msg);
                            }
                        });
                    }}>unsubscribe</a></div>
                }
                {!subscribed &&
                    <div className='text-center'><a className="btn mb-0 mybutton btn-block" 
                    onClick={() => {
                        fetch("http://127.0.0.1:8000/subscribePackage", {
                            method: 'POST',
                            headers: {
                            'Content-type':'application/json',
                            },
                            body: JSON.stringify({
                                package_pk: pk,
                                user_pk: user_pk,
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            
                            console.log(data);
                            if(data.success){
                                window.location.reload();
                            }
                            else {
                                console.log(data.msg);
                            }
                        });
                    }}>subscribe</a></div>
                }
                </>
            }
        </div>
    </>
    )
}

ServicePackage.defaultProps = {
    pk: -1,
    user_pk: -1,
    title: '',
    description: '',
    fee: 0,
    subscription_duration: '',
    subscriptionHandler: null,
    subscribed: false,
    canSubscribe: false,
    userType: '',
}

ServicePackage.propTypes = {
    pk: PropTypes.number,
    user_pk: PropTypes.number,
    subscriptionHandler: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    fee: PropTypes.number,
    subscription_duration: PropTypes.string,
    subscribed: PropTypes.bool,
    canSubscribe: PropTypes.bool,
    userType: PropTypes.string,
}