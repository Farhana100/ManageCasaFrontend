import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../misc/Button";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./checkoutform";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {

  const stripePromise = loadStripe('pk_test_51LbejzEt2WQeUGdbBmXAYcp7o5BPAz6TYi44sK0jJiUev3S6WCB3q3NSbEcPXwMFTyuIDp9WxcR1w7hWDtsZ4MyR00dIUQxg2B')
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

//   var options;

  function checkout() {
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
        amount: "1500",
      }),
    })
      .then((response) => response.json())
      .then((data) => { 
        setClientSecret(data.client_secret);
        //  Data returns the checkout URL given for
        //  a specific order. The backend returns it
        //  to the frontend and the frontend redirects.
        
        // console.log("Checkout URL", data);
        console.log("client secret:", data.client_secret);
        console.log(clientSecret)
        setDataFetched(true);
        // window.location.href = data;
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
    checkout();
    setIsLoading(false);
    console.log(options)
  }, []);


  return (
    <>
    {!isLoading && datafetched ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
    ) : (
        <div> Loading... </div>
      )}
    </>
  );
}