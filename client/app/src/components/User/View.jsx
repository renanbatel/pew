import React from "react"
import { Link } from "react-router-dom"

const View = ( { match } ) => {

  return (
    <div>
      <p>{ match.params.username }</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default View