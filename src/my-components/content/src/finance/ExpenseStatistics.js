import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../misc/Button";
import FinanceNavbar from "./miscFinance/FinanceNavbar";
import '../../static/css/finance.css';
import Table from "./miscFinance/table";
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

    return(
    <div>
        <FinanceNavbar/>
        <h5>Expense Log</h5>
        <div className="table">
            <Table/>
        </div>
        <div className="add-expense">
            <div></div>
            <div>
                <Button text="Add Expense" />
            </div>
        </div>
    </div>
        )
}