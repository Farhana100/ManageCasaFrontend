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

export default function ServicePackageEdit(){

    let user = JSON.parse(localStorage.getItem('data'));

    if (user.userType !== 'admin') {
        window.location.replace('/dashboard');
    }
    const {id} = useParams();
    const {package_id} = useParams();

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
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleFeeChange = (e) => {
        setFee(e.target.value);
    }

    const handleSubscription_durationChange = (e) => {
        setSubscription_duration(e.target.value);
    }

  
    function fetchServiceProvider(){
        fetch(`http://127.0.0.1:8000/getServiceProvider/${id}/0`)   // 0 dummy
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
  
  
    function fetchPackageInfo(){
        fetch(`http://127.0.0.1:8000/getServicePackage/${package_id}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if(data.success){
                
                setTitle(data.title);
                setDescription(data.description);
                setFee(data.fee);
                setSubscription_duration(data.duration);
            }
            else{
              navigate('/notFound')
            }
        });
    }
  
    useEffect(() => {
      fetchServiceProvider();    
      fetchPackageInfo();
    }, []);
    
    function editServicePackageHandler(e){
        e.preventDefault();
            
        fetch("http://127.0.0.1:8000/editServicePackage", {
            method: 'POST',
            headers: {
            'Content-type':'application/json',
            },
            body: JSON.stringify({
                pk: package_id,
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
        
        <h4> Add New Package</h4>
        <hr className='mb-5'/>
        <div className='container-fluid pl-0'>
            <div className='row pl-0'>
                <div className='col-7'>
                    <form className='container'>
                        {/* title  */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="title">Title: </label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp" value={title} onChange={handleTitleChange}/>
                            <small id="titleHelp" className="form-text text-muted">{errorMsg['title']}</small>
                        </div>

                        {/* description */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="description">Description: </label>
                            <input type="text-area" className="form-control" id="description" aria-describedby="descriptionHelp" value={description} onChange={handleDescriptionChange}/>
                            {/* {errorMsg.description !== "" && 
                                <small id="descriptionHelp" className="form-text text-muted">{errorMsg}</small>
                            } */}
                        </div>

                        {/* fee */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="fee">Fee: </label>
                            <input type="number" className="form-control" id="fee" aria-describedby="feeHelp" value={fee} onChange={handleFeeChange} required name="price" min="0" step=".01"/>
                            {/* <small id="feeHelp" className="form-text text-muted">this is a test</small> */}
                        </div>
                        

                        {/* subscription_duration */}
                        <div className="form-group">
                            <label  className='h6 bold' htmlFor="subscription_duration">Subscription Duration: <small>(months)</small></label>
                            <input type="number" className="form-control" id="subscription_duration" aria-describedby="subscription_durationHelp" value={subscription_duration} onChange={handleSubscription_durationChange} required name="time" min="0" step=".01"/>
                            {/* <small id="subscription_durationHelp" className="form-text text-muted">this is a test</small> */}
                        </div>
                        
                        <div className='form-group row my-5'>
                            <div className='col d-flex justify-content-start'><Button text={'Cancel'} link={`/service/${id}`} /></div>
                            <div className='col d-flex justify-content-end'><Button text={'Submit'} OnClick={editServicePackageHandler}/></div>
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




