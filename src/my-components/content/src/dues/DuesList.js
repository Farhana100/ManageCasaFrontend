import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import '../../static/css/dues.css'
import Button from '../../../misc/Button';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./checkoutform";



export default function DuesList(props){
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    window.location.replace('/login');
  }
  
  if (! user.user_active) {
    window.location.replace('/login');
  }

  const [totalDue, setTotalDue] = useState(0);
  const payDuesList = useRef([]);
  const [duesData, setDUesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

  const [ clientSecret, setClientSecret ] = useState('');
  const [ addedclientsecret, setAddedClientSecret ] = useState(false);

  const stripePromise = loadStripe('pk_test_51LbejzEt2WQeUGdbBmXAYcp7o5BPAz6TYi44sK0jJiUev3S6WCB3q3NSbEcPXwMFTyuIDp9WxcR1w7hWDtsZ4MyR00dIUQxg2B')

  function fetchDues() {
    fetch(`http://127.0.0.1:8000/getDues/${user.uid}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
            console.log(data.data);
            setDUesData(data.data);
            setDataFetched(true);
        }
      });
  }
  

    function paymentHandler(){

        fetch('http://127.0.0.1:8000/stripeCheckoutSession', {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "https://checkout.stripe.com",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            amount: totalDue,
        }),
        })
        .then((response) => response.json())
        .then((data) => { 
            setClientSecret(data.client_secret);
            setAddedClientSecret(true);
        });
    }

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

   

    useEffect(() => {
        fetchDues();
        setIsLoading(false);
    }, []);
    

  return (
    <>
    
    {
    addedclientsecret ? 
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm paydueslist={payDuesList}/>
    </Elements>
    :
    
    !isLoading && datafetched 
    ? 
    <>
        <div className='container'>
        <h3 className='h3'>Your Dues:</h3>
        <table className="table text-center">
            <thead>
                <tr>
                <th scope="col"><div>#</div></th>
                <th scope="col"><div>Pay To</div></th>
                <th scope="col"><div>Due Date</div></th>
                <th scope="col"><div>Purpose</div></th>
                <th scope="col"><div>Due Amount</div></th>
                <th scope="col"><div>Pay</div></th>
                </tr>
            </thead>
            <tbody>
                {duesData.map((due, key) => {
                    return(
                        <tr>
                        <th scope="row">{key+1}</th>
                        <td>{due['pay_to']}</td>
                        <td>{due['due_date']}</td>
                        <td>{due['description']}</td>
                        <td>{due['amount']} tk</td>
                        <td><input class="form-check-input" type="checkbox" onClick={(e) => {
                                if(!due['selected']){
                                    duesData[key]['selected'] = !due['selected'];
                                    setDUesData(duesData);
                                    setTotalDue(totalDue + due['amount']);

                                    payDuesList.current = payDuesList.current.concat(due)
                                    console.log("this", payDuesList.current);
                                }
                                else {
                                    duesData[key]['selected'] = !due['selected'];
                                    setDUesData(duesData);
                                    setTotalDue(totalDue - due['amount']);

                                    const index = payDuesList.current.indexOf(due);
                                    if (index > -1) { 
                                        payDuesList.current.splice(index, 1); 
                                    }

                                    payDuesList.current = payDuesList.current
                                    console.log("that", payDuesList.current);
                                }
                            }

                        }/></td>
                        </tr>
                    )
                })}
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <th><div>Total Payable Amount: </div></th>
                <th>{totalDue} tk</th>
                <td></td>
                </tr>
            </tbody>
        </table>
        </div>
        
        {!totalDue &&
            <div className='container text-right'><button type="button" className="btn mybutton" disabled>Proceed with Payment</button></div>
        }
        
        {totalDue !== 0 &&
            <div className='container text-right'><button type="button" className="btn mybutton" onClick={paymentHandler} >Proceed with Payment</button></div>
        }

    </>
    :
    <>loading ...</>
    }

    </>  
  )
}

