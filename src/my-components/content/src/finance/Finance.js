import React, { Component } from 'react'
import {Outlet} from 'react-router-dom';

export default class Finance extends Component {
  render(){
    return (
      <Outlet />
    )
  }
}
