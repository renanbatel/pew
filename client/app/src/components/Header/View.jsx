import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const View = ( {
  user,
  handleSignout,
} ) => {

  return (
    <header>
      <div className="container">
        <Link
          to="/"
          className="app-name"
        >
          <p>Pew</p>
        </Link>
        <div className="_menu">
          <Link
            to={ `/${ user.current.username }` }
          >
            <i className="fas fa-user"></i>
            My profile
          </Link>
          <button
            className="signout"
            onClick={ handleSignout }
          >
            <i className="fas fa-sign-out-alt"></i>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

View.propTypes = {
  user: PropTypes.instanceOf( Object ).isRequired,
  handleSignout: PropTypes.func.isRequired,
}

export default View