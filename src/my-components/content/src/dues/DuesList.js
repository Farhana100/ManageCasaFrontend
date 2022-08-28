import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import '../../static/css/dues.css'
import Button from '../../../misc/Button';
import Payment from './payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./checkoutform";



export default function DuesList(props){
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    window.location.replace('/login');
  }

  const [totalDue, setTotalDue] = useState(0);
  const payDuesList = useRef([]);
  const [duesData, setDUesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

//   const [clientSecret, setClientSecret] = useState("");
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
// proceed with payment button e click korle nicher function ta call hobe
// alada kore confirmation pop up box chacchi na
    function paymentHandler(){
        console.log("keno dhuklam")
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
            console.log("client secret:", data.client_secret);
            console.log(clientSecret)
            setAddedClientSecret(true);
            // window.location.reload("/dues/payment");
        });
        
        // const appearance = {
        //     theme: 'stripe',
        //   };
        //   const options = {
        //     clientSecret,
        //     appearance,
        //   };
        // console.log(addedclientsecret)

        // return (
        //     <>
        //     addedclientsecret ?
        //     <Payment options={options} />
        //     </>
        // )
        


        // fetch("http://127.0.0.1:8000/duesPayment", {
        //     method: 'POST',
        //     headers: {
        //       'Content-type':'application/json',
        //     },
        //     body: JSON.stringify({
        //         dues:payDuesList.current
        //     })
        //   })
        //   .then(response => response.json())
        //   .then(data => {
            
        //     if(data.success){
        //         window.location.reload();
        //         alert('payment successful');
        //     }
        //     else {
        //         alert('payment unsuccessful');
        //     }
        //   });
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
          <CheckoutForm />
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

        <button type="button" className="btn mybutton" onClick={paymentHandler}>Proceed with Payment</button>
    </>
    :
    <>loading ...</>
    }

    </>  
  )
}

