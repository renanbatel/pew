import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const View = ( {
  name,
  email,
  username,
  password,
  handleChange,
  handleSubmit,
} ) => {

  return (
    <section className="page signin">
      <div className="form-panel">
        <p className="app-name">Pew</p>
        <p className="_sub">Sign Up!</p>

        <form className="signup" onSubmit={ handleSubmit }>
          <div className="text-field">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              name="name"
              value={ name } 
              onChange={ handleChange }
            />

            {/* <p className="field-error"></p> */}

          </div>
          <div className="text-field">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              value={ email } 
              onChange={ handleChange }
            />

            {/* <p className="field-error"></p> */}

          </div>
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
            <Link to="/login">
              I already have an account
            </Link>
            <button className="default" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>

  )
}

View.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default View