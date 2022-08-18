import React, { useEffect, useState } from 'react'
import Button from '../../../misc/Button';
import ApartmentCard from './ApartmentCard';



function Aparts ({array}) {
    const aparts = array.map(
        (item) => {
            return <div className="col-sm-3 mb-2"><ApartmentCard apartment_number={item['apartment_number']} tenant={item['tenant']} owner={item['owner']} detailsLink={"/apartments/" + item['id']} imageLink={item['image']} /></div>
        }
      );
  
    return (
      <>{aparts}</>
    );
  }


function Floors ({dict}) {
    const array = Object.values(dict);
    const floors = array.map(
        (item) => {
            // console.log('here',item[0]['floor_number']);
            return (<>
                <div className='h4'>Floor no. : {item[0]['floor_number']}</div>
                <hr/>
                <div className="row mb-4">
                    <Aparts array={item}/>
                </div>
            </>)
        }
    );
  
    return (
      <>{floors}</>
    );
  }



export default function ApartmentList() {

    const user = JSON.parse(localStorage.getItem('data'));
    if (! user) {
        user = {
        username: "",
        userType: "",
        user_active: false,
        }
    }

    const [ allApartmentData, setAllApartmentData ] = useState({});
    console.log("test ", user.userType);
  
    function fetchAllApartment(){


        fetch(`http://127.0.0.1:8000/getAllApartments/${user.building}`)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            if(!data.msg){
                setAllApartmentData(data);
                // console.log(allApartmentData);
                Object.keys(allApartmentData).forEach(function(key) {
                    console.log("here ", key, allApartmentData[key]);
                });
            }
        });
    }
  
    useEffect(() => {
      fetchAllApartment();    
    }, []);

    return (
        <>
        <div className="container-fluid">
            {user.userType === 'admin' && 
                <div className='d-flex flex-row-reverse m-3'>
                    <Button text={'add new'} link={'/apartments/create'}/>
                </div>
            }
            <Floors dict={allApartmentData}/>
        </div>
        </>
    )
}
