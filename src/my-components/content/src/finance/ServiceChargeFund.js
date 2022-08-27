import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../misc/Button";
import FinanceNavbar from "./miscFinance/FinanceNavbar";
import "../../static/css/finance.css";
import Table from "./miscFinance/table";
import { useState, useEffect } from "react";
import { WindowSharp } from "@mui/icons-material";

export default function ServiceChargeFund(props) {
  let user = JSON.parse(localStorage.getItem("data"));
  if (!user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    };
  }

  const [fundData, setFundData] = useState({});
  const [ total_fund, setTotalFund ] = useState(0);
  const [ servicecharge, setServiceCharge ] = useState(0);
  const [ charge, setCharge ] = useState(0);
  const [datafetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ isupdating, setIsUpdating ] = useState(false);

  function fetchFundInfo() {
    fetch(`http://127.0.0.1:8000/getFundInfo/${user.building}`)
      .then((response) => response.json())
      .then((data) => {
        setFundData(data.funds);
        setTotalFund(data.total_fund);
        setServiceCharge(data.service_charge_amount);
        setDataFetched(true);
      });
  }

  function updateServiceChargeHandler(){
    setIsUpdating(true);
  }

  function UpdateCharge(){
    fetch(`http://127.0.0.1:8000/updateCharge/${user.building}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        service_charge: charge 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // navigate("/election/poll");
          console.log(data.msg)
        }
      });
      setIsUpdating(false);
      window.location.reload();
  }

  useEffect(() => {
    fetchFundInfo();
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
            <div className="amount">
              <h5>Current Payable Amount:  </h5>
              {isupdating ? 
              <div>
                    <input className="serv-upt" type="text" name="name" onChange={(event)=>setCharge(event.target.value)}/>
              </div>
              :
              <p className="amnt"> {servicecharge}</p>
              }
            </div>
            
          </div>
          {user.userType == "admin" ? (
            <>
              <div></div>
              {!isupdating ? 
              <div className="update-charge">
                <Button text="Update Service Charge" OnClick={updateServiceChargeHandler}/>
              </div>
              :
              <div className="update-charge">
                <Button text="Update" OnClick={UpdateCharge}/>
              </div>
              }
            </>
          ) : null}
          <div>
            <p>Collection Log </p>
          </div>

          <div className="table">
            <Table fundInfo={fundData} />
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
