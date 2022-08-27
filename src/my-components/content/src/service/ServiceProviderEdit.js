import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../misc/Button';
import '../../static/css/apartment.css'

export default function ServiceProviderEdit(){
    let user = JSON.parse(localStorage.getItem('data'));

    if (user.userType !== 'admin') {
        window.location.replace('/apartments');
    }
    const {id} = useParams();

    function fetchServiceProvider(){
        fetch(`http://127.0.0.1:8000/getServiceProvider/${id}`)
        .then(response => response.json())
        .then((data) => {
            console.log('data ', data);
            if(data){
                setFloor_number(data.apartment_floor_number);
                setApartment_number(data.apartment_number);
                setRent(data.apartment_rent);
                setService_charge_due_amount(data.service_charge_due_amount);
                setSelectedFiles(data.apartment_images);

                setApartmentData(data);
                setApartmentImages(data.apartment_images);
            }
            else {
                console.log("smth is wrong in th backend");
            }
        });
    }
  
    useEffect(() => {
        fetchServiceProvider();    
    }, []);

    
    function updateServiceProviderHandler(e){
        e.preventDefault();
        fetch("http://127.0.0.1:8000/updateServiceProvider", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                pk: id,
                building: building,
                floor_number: floor_number,
                apartment_number: apartment_number,
                rent: rent,
                service_charge_due_amount: service_charge_due_amount,
                selectedFiles: selectedFiles
            })
          })
          .then(response => response.json())
          .then(data => {
            
            console.log(data.error);
            if(data.error){
                console.log(data.msg)
            }
            else {
                navigate('/service');
            }
          });
    }

    let navigate = useNavigate();


  return (
    <>
        <h4> Edit Service Provider:</h4>
        <hr/>
        <div className='container-fluid pl-0'>
            
        </div>
        
          
    </>
  )
}




