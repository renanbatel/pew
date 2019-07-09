import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Logo from "../../../public/images/logo.png"

const View = ( {
  message,
  username,
  password,
  handleChange,
  handleSubmit,
} ) => {

  return (
    <section className="page signin">
      <div className="form-panel">
        <img className="_logo" src={ Logo } />
        <p className="app-name">Pew</p>
        <p className="_sub">Sign In</p>

        <form className="signin" onSubmit={ handleSubmit }>

          {
            message
              ? <p className="form-error">{ message }</p>
              : ""
          }

          <div className="text-field">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              name="username"
              value={ username }
              onChange={ handleChange }
            />

            {/* <p className="field-error"></p> */}

          </div>
          <div className="text-field">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              value={ password } 
              onChange={ handleChange }
            />

            {/* <p className="field-error"></p> */}

          </div>
          <div className="_actions">
            <Link to="/signup">Sign Up</Link>
            <button
              className="default"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

View.propTypes = {
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default View