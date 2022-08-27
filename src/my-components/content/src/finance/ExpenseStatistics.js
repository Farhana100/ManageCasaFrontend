import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../misc/Button";
import FinanceNavbar from "./miscFinance/FinanceNavbar";
import "../../static/css/finance.css";
import ExpenseTable from "./miscFinance/expensetable";
import { useState, useEffect } from "react";

export default function ServiceChargeFund(props) {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [expenseData, setExpenseData] = useState({});
  const [ total_fund, setTotalFund ] = useState(0);
  const [datafetched, setDataFetched] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ purpose, setPurpose ] = useState("");
  const [ amount, setAmount ] = useState(0);
  const [ comment, setComment ] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ isAdding, setIsAdding ] = useState(false);

  function fetchExpenseInfo() {
    fetch(`http://127.0.0.1:8000/getExpenseInfo/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenseData(data.expenses);
        setTotalFund(data.total_fund);
        console.log(data.expenses)
        setDataFetched(true);
      });
  }

  function addExpenseHandler(){
    setIsAdding(true);
  }

  function AddExpense(){
    console.log("dhukechi")
    fetch(`http://127.0.0.1:8000/addExpense/${user.building}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        purpose: purpose,
        amount: amount,
        comment: comment
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.msg)
        }
      });
      setIsAdding(false);
      window.location.reload();
  }

  useEffect(() => {
    fetchExpenseInfo();
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && datafetched ? (
        <div>
          <FinanceNavbar />
          <div className="header-list">
            <div className="amount">
                <h5>Total Fund:  </h5>
                <p className="amnt"> {total_fund}</p>
            </div>
          </div>
          <div className="table">
            <ExpenseTable expenseInfo={expenseData}/>
          </div>
          <div>
            {isAdding ?
            <div className="add-expense-field">
                <div>
                <DateTimePicker onChange={setDate} value={date} /> 
                </div>
                <div>
                    <input className="add-exp" type="text" name="name" onChange={(event)=>setPurpose(event.target.value)}/>
                </div>
                <div>
                    <input className="add-exp" type="text" name="name" onChange={(event)=>setAmount(event.target.value)}/>
                </div>
                <div>
                    <input className="add-exp" type="text" name="name" onChange={(event)=>setComment(event.target.value)}/>
                </div>
            </div>
            :
            null}
          </div>
          {user.userType == "admin" ? (
            <>
          <div className="add-expense">
            <div></div>
            {!isAdding ? 
            <div>
              <Button text="Add Expense" OnClick={addExpenseHandler}/>
            </div>
            :
            <div>
              <Button text="Add" OnClick={AddExpense}/>
            </div>
            }
          </div>
          </>
            ) : (
            null
            )}
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
