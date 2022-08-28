// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../misc/Button";

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from "./checkoutform";

// export default function Payment(props) {
//     const stripePromise = loadStripe('pk_test_51LbejzEt2WQeUGdbBmXAYcp7o5BPAz6TYi44sK0jJiUev3S6WCB3q3NSbEcPXwMFTyuIDp9WxcR1w7hWDtsZ4MyR00dIUQxg2B')
//     console.log("ashchi", props.options)

//     return (
//         <Elements stripe={stripePromise} options={props.options}>
//           <CheckoutForm />
//         </Elements>
//       );
// }