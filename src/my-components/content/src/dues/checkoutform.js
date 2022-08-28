import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log("onno kichu")
    console.log("dues list: ", props.paydueslist)

    fetch(`http://127.0.0.1:8000/duesPayment/${user.building}`, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                dues:props.paydueslist.current
            })
          })
          .then(response => response.json())
          .then(data => {
            
            if(data.success){
                window.location.reload();
                alert('payment successful');
            }
          });

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      
      elements,
      confirmParams: {

        return_url: 'http://127.0.0.1:3000/dues',
      },
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;