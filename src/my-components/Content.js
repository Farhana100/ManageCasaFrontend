import React from 'react'
import PropTypes from 'prop-types'
import Tenants from './content/src/Tenants';
import Committee from './content/src/Committee';
import Owners from './content/src/Owners';
import AddCommittee from './content/src/AddCommittee';
import Button from './misc/Button'

import './content/static/css/content.css';

export default function Content({page, content_vars}) {
  switch(page.toLowerCase()) {
    case "committee members":
      return ( <Committee committee={content_vars}/> )
    case "tenants":
      return ( <Tenants tenants={content_vars}/> )
    case "owners":
      return ( <Owners owners={content_vars}/> )
    case "add committee member":
      return ( <AddCommittee/> )
    default:
      return (<>content</>)
  }
}

Content.defaultProps = {
  page: null,
  content_vars: null,
}

Content.propTypes = {
  page: PropTypes.string,
  content_vars: PropTypes.any,
}