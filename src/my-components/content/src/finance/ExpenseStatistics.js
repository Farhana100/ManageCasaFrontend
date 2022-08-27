import React, { Component } from "react";
import DatePicker from "react-datepicker";
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
  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function fetchExpenseInfo() {
    fetch(`http://127.0.0.1:8000/getExpenseInfo/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenseData(data.expenses);
        console.log(data.expenses)
        setDataFetched(true);
      });
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
          <h5 className="exp-hd">Expense Log</h5>
          <div className="table">
            <ExpenseTable expenseInfo={expenseData}/>
          </div>
          <div className="add-expense">
            <div></div>
            <div>
              <Button text="Add Expense" />
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
