import React, { Component } from 'react'
import {Outlet} from 'react-router-dom';

export default class PaymentHistory extends Component {
  render(){
    return (
      <Outlet />
    )
  }
}
