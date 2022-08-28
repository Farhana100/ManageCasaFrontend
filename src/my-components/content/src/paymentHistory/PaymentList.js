import React, { useEffect, useState } from 'react'
// import '../../static/css/paymentHistory.css'
import Button from '../../../misc/Button';



export default function PaymentList(props){
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    window.location.replace('/login');
  }
  
  if (! user.user_active) {
    window.location.replace('/login');
  }

  const [paymentData, setPaymentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [datafetched, setDataFetched] = useState(false);

  function fetchPayment() {
    fetch(`http://127.0.0.1:8000/getPayments/${user.uid}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
            console.log(data.data);
            setPaymentData(data.data);
            setDataFetched(true);
        }
      });
  }

    useEffect(() => {
        fetchPayment();
        setIsLoading(false);
    }, []);

  return (
    <>
    {
    !isLoading && datafetched 
    ? 
    <>
        <div className='container'>
        <h3 className='h3'>Your Payment History:</h3>
        <table className="table text-center">
            <thead>
                <tr>
                <th scope="col"><div>#</div></th>
                <th scope="col"><div>Transaction Number</div></th>
                <th scope="col"><div>Pay To</div></th>
                <th scope="col"><div>Due Date</div></th>
                <th scope="col"><div>Payment Date</div></th>
                <th scope="col"><div>Purpose</div></th>
                <th scope="col"><div>Due Amount</div></th>
                </tr>
            </thead>
            <tbody>
                {paymentData.map((payment, key) => {
                    return(
                        <tr>
                        <th scope="row">{key+1}</th>
                        <td>{payment['transaction_id']}</td>
                        <td>{payment['pay_to']}</td>
                        <td>{payment['due_date']}</td>
                        <td>{payment['payment_date']}</td>
                        <td>{payment['description']}</td>
                        <td>{payment['amount']} tk</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    </>
    :
    <>loading ...</>
    }
    </>  
  )
}

