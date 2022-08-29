import React, { useEffect, useState } from 'react'
import logo from '../my-components/brand/logo.svg'
import '../my-components/content/static/css/home.css'

export default function Dashboard() {
  let user = JSON.parse(localStorage.getItem('data'));

  if (!user) {
      window.location.replace('/login');
  }

  if (!user.user_active) {
      window.location.replace('/login');
  }


  const [ basicsData, setbasicsData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ datafetched, setDataFetched ] = useState(false);
  
  function fetchBasics(){


      fetch(`http://127.0.0.1:8000/getBasics/${user.building}`)
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          if(!data.success){
            setbasicsData(data);
            setDataFetched(true);
          }
      });
  }

  useEffect(() => {
    fetchBasics();    
    setIsLoading(false);
  }, []);


  return (<>
    {
    !isLoading && datafetched
    ? 
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-8'>


            {/* Basic Information ------------------------------------------------------------------------- */}
                <div className='row bg-light p-2 rounded'>
                    <h4 className='h4'>Basic Information</h4>
                    <hr className='my-3'></hr>
                    {/* row 1 */}
                    <div className='row mb-3 mx-1'>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Number of Floors */}
                                    <h5 className="card-title">Number of Floors</h5>
                                    <p className='display-4'>{basicsData['number_of_floors']}</p>
                                    <p className='display-4'>here</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Number of Apartments */}
                                    <h5 className="card-title">Number of Apartments</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Number of Owners */}
                                    <h5 className="card-title">Number of Owners</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* row 2 */}
                    <div className='row mb-3 mx-1'>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Number of Tenants */}
                                    <h5 className="card-title">Number of Tenants</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Committee members */}
                                    <h5 className="card-title">Committee Members</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                {/* Number of Owners */}
                                    <h5 className="card-title">Service Charge</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{"(month)"}</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='col-4 p-3'>

                <div className='row m-2'>
                    <div className="card shadow-sm">
                        <div className="card-body">
                        {/* Total Fund */}
                            <h5 className="card-title">Current Total Fund</h5>
                            <hr></hr>
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>

                <div className='row m-2'>
                    <div className="card shadow-sm w-100">
                        <div className="card-body">
                            <h5 className="card-title">Highlights:</h5>
                            <hr></hr>
                        </div>
                        
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <p className='h6 text-muted'>Elections:</p>
                            
                            
                            </li>
                            <li class="list-group-item">
                            <p className='h6 text-muted'>Polls:</p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
    :
    <div>
        <div className='home-bg-image1-grad'>
            <div className="text-center my-5">
                <img className="img-fluid mb-4" src={logo} alt="..." />
                <h1 className="fs-3 fw-bolder">{user.building}</h1>
            </div>
            <div className="py-5 bg-image-full home-bg-image1">
                <div className="py-5"></div>
            </div>
        </div>
    </div>    

    }</>
  )
}
