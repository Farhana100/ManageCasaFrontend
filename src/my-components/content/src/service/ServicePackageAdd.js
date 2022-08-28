import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useNavigate, useParams} from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/serviceProviders.css'
  

function PackagesTitle ({array}) {
    const packs = array.map(
        (item) => {
            return <div className="ml-2 mb-2 text-muted">{item['title']}: {item['fee']}tk per {item['duration']} month</div>
        }
      );
  
    return (
      <>{packs}</>
    );
}

export default function ServicePackageAdd(){

    let user = JSON.parse(localStorage.getItem('data'));

    if (user.userType !== 'admin') {
        window.location.replace('/apartments');
    }
    const {id} = useParams();

    let errorMsg = {
        password:"",
        username:""
    }
    
    const [ building, setBuilding ] = useState(user.building);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ fee, setFee ] = useState("");
    const [ subscription_duration, setSubscription_duration ] = useState("");
    const [ serviceProviderData, setServiceProviderData ] = useState({});
    const [ serviceProviderPackages, setServiceProviderPackages] = useState([]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        console.log(title);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        console.log(description);
    }

    const handleFeeChange = (e) => {
        setFee(e.target.value);
        console.log(fee);
    }

    const handleSubscription_durationChange = (e) => {
        setSubscription_duration(e.target.value);
        console.log(subscription_duration);
    }

  
    function fetchServiceProvider(){
        fetch(`http://127.0.0.1:8000/getServiceProvider/${id}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if(data.success){
              setServiceProviderData(data);
              setServiceProviderPackages(data.packages);
            }
            else{
              navigate('/notFound')
            }
        });
    }
  
    useEffect(() => {
      fetchServiceProvider();    
    }, []);
    
    function createServicePackageHandler(e){
        e.preventDefault();
            
        fetch("http://127.0.0.1:8000/createServicePackage", {
            method: 'POST',
            headers: {
            'Content-type':'application/json',
            },
            body: JSON.stringify({
                serviceProvider_pk: id,
                building: building,
                title: title,
                description: description,
                fee: fee,
                subscription_duration: subscription_duration,
            })
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            if(data.success){
                navigate(`/service/${id}`);
            }
            else {
                console.log(data.msg);
            }
        });
    }

    let navigate = useNavigate();


  return (
    <>
        
        <h4> Add New Service Provider</h4>
        <hr/>
        <div className='container-fluid pl-0'>
            <div className='row pl-0'>
                <div className='col-7'>
                    <form className='container'>
                        {/* title  */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="title">Title: </label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp" onChange={handleTitleChange}/>
                            <small id="titleHelp" className="form-text text-muted">{errorMsg['title']}</small>
                        </div>

                        {/* description */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="description">Description: </label>
                            <input type="text-area" className="form-control" id="description" aria-describedby="descriptionHelp" onChange={handleDescriptionChange}/>
                            {/* {errorMsg.description !== "" && 
                                <small id="descriptionHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* fee */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="fee">Fee: </label>
                            <input type="number" className="form-control" id="fee" aria-describedby="feeHelp" onChange={handleFeeChange} required name="price" min="0" step=".01"/>
                            {/* <small id="feeHelp" className="form-text text-muted">this is a test</small> */}
                        </div>
                        

                        {/* subscription_duration */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="subscription_duration">Subscription Duration: <small>(months)</small></label>
                            <input type="number" className="form-control" id="subscription_duration" aria-describedby="subscription_durationHelp" onChange={handleSubscription_durationChange} required name="time" min="0" step=".01"/>
                            {/* <small id="subscription_durationHelp" className="form-text text-muted">this is a test</small> */}
                        </div>
                        
                        <div className='form-group row my-5'>
                            <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={`/service/${id}`} /></div>
                            <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={createServicePackageHandler}/></div>
                        </div>
                    </form>
                </div>
                <div className='col-5 service-provider-summary rounded p-4'>
                    <p className='h5'>Service Provider summary:</p>
                    <hr/>
                    <div className='container-fluid mt-5 pl-0'>
                        <div>
                            <div><img className="service-provider-image align-bottom border shadow-sm p-3 mb-5 bg-white rounded" src={'http://127.0.0.1:8000' + serviceProviderData.image}/></div>
                            <div><p className='h4 mt-5'>{serviceProviderData.company_name}</p></div>
                        </div>
                        <hr/>
                        <div className='row'>
                            <div className='col-2'><strong>Address: </strong></div>
                            <div className='col'>{serviceProviderData.address}</div>
                        </div>
                        <div className='row'>
                            <div className='col-2'><strong>Contact number: </strong></div>
                            <div className='col'>{serviceProviderData.phone_number}</div>
                        </div>
                        <div className='row'>
                            <div className='col-2'><strong>Bkash number: </strong></div>
                            <div className='col'>{serviceProviderData.bkash_acc_number}</div>
                        </div>
                        <div className='row'>
                            <div className='col-2'><strong>Official Website: </strong></div>
                            <div className='col'><a target={'blank'} href={serviceProviderData.website}>{serviceProviderData.website}</a></div>
                        </div>
                        
                        <hr/>
                        <div className='container'>
                            <p className='h4'>Existing Packages:</p>
                            <PackagesTitle array={serviceProviderPackages}/>
                        </div>

                    </div> 
                </div>
            </div>
        </div>
    </>
  )
}




