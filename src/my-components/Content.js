import React from 'react'
import PropTypes from 'prop-types'
import Tenants from './content/src/Tenants';
import Committee from './content/src/Committee';
import Owners from './content/src/Owners';
import AddCommittee from './content/src/AddCommittee';
import Election from './content/src/Election';

import './content/static/css/content.css';


export default function Content({page, content_vars, user}) {
  switch(page.toLowerCase()) {
    case "committee members":
      return ( <Committee committee={content_vars} user={user}/> )
    case "add committee member":
      return ( <AddCommittee/> )
    case "tenants":
      return ( <Tenants tenants={content_vars}/> )
    case "owners":
      return ( <Owners owners={content_vars}/> )
    case "election":
        return ( <Election/> )
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