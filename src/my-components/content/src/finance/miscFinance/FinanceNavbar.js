import React, { Component } from 'react'

export default function FinanceNavbar(props){
    return(
        <nav className="finance-navbar navbar navbar-expand-lg navbar-light bg-light">
            <a className="nav-item nav-link elec" href="/finance">Service Charge Fund</a>
            <a className="nav-item nav-link poll" href="/finance/expense">Expense Statistics</a>
        </nav>
    )
}