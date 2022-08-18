import React, { Component } from 'react'
import {Outlet} from 'react-router-dom';

export default class Election extends Component {
  render(){
    return (
      <Outlet />
    )
  }
}
