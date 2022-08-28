import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import '../../static/css/dues.css'
import Button from '../../../misc/Button';



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

    useEffect(() => {
        fetchDues();
        setIsLoading(false);
    }, []);


    const paymentHandler = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/duesPayment", {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
            },
            body: JSON.stringify({
                dues:payDuesList.current
            })
          })
          .then(response => response.json())
          .then(data => {
            
            if(data.success){
                window.location.reload();
                alert('payment successful');
            }
            else {
                alert('payment unsuccessful');
            }
          });
    }

    

  return (
    <>
    {
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

        {/* ---------------- confirmation modal -------------------- */}

        {/* <!-- Button trigger modal --> */}
        <div className='text-right m-5 container'><button type="button" class="btn mybutton" data-toggle="modal" data-target="#exampleModal">Proceed with Payment</button></div>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Payment Summary</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Total Charge: {totalDue} Tk </p>
                {totalDue === 0 && <p>You must select at least one due.</p>}
            </div>
            <div className="modal-footer">
                {totalDue !== 0 && <button type="button" className="btn mybutton" onClick={paymentHandler}>Confirm</button>}
            </div>
            </div>
        </div>
        </div>
    </>
    :
    <>loading ...</>
    }
    </>  
  )
}

