import React, { useEffect, useState } from 'react'
import '../../static/css/owners.css'
import Button from '../../../misc/Button';



export default function OwnerList(props){
  
  let user = JSON.parse(localStorage.getItem('data'));

  if (!user) {
      window.location.replace('/login');
  }

  if (!user.user_active) {
      window.location.replace('/login');
  }

  const [ownersData, setOwnersData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

  function fetchOwners() {
    fetch(`http://127.0.0.1:8000/getAllOwners/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setOwnersData(data.data);
          setDataFetched(true);
        }
      });
  }

  useEffect(() => {
    fetchOwners();
    setIsLoading(false);
  }, []);

  return (
    <>
    {
    !isLoading && datafetched 
    ? 
    <div className='owners'>
      {user.userType === 'admin' && 
          <div className='d-flex flex-row-reverse m-3'>
              <Button text={'add new'} link={'/owners/add'}/>
          </div>
      }
      <div className='container mycontainer'>
        <h3 className='owner-head'>List of Flat Owners</h3>
        {ownersData.map(owner=> {
                return(
                    <>
                    <div className='grid-container'>
                    <div className='grid-child-element'>
                        <img className="ownerimage" src={'http://127.0.0.1:8000' + owner.image} />
                    </div>
                    <div className='grid-child-element'>
                    <div className='row myrow'>
                        <h5 className='owner-title'>{owner.owner_name}</h5>
                        <p className='owner-text'> Floor No. {owner.floor_no}</p>
                        <p className='owner-text'> Apartment No. {owner.unit_no}</p>
                        <p className='mobile'>Mobile No. {owner.phone_number}</p>
                    </div>
                    </div>
                    </div>
                    <hr/>
                    </>
                )
        })}
        </div>
    </div>
    :
    null
    }
    </>  
  )
}

