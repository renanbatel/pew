import React from "react"
import PropTypes from "prop-types"

import Timeline from "../Timeline"

const View = ( {
  profile,
  handleFollow,
} ) => {

  console.log( profile )

  return (
    <div>
      
    </div>
  )
}

View.propTypes = {
  profile: PropTypes.instanceOf( Object ).isRequired,
  handleFollow: PropTypes.func.isRequired,
}

export default View