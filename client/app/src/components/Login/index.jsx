import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import withAuth from "../withAuth"
import { loginRequest } from "../../redux/user"
import View from "./View"

class Login extends Component {

  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
  }

  static mapDispatchToProps = dispatch => bindActionCreators( {
    loginRequest,
  }, dispatch )

  state = {
    message: "",
    username: "",
    password: "",
  }

  handleChange = ( { currentTarget } ) => {
    const { name, value } = currentTarget

    this.setState( prevState => ( {
      ...prevState,
      [ name ]: value,
    } ) )
  }

  handleSubmit = ( event ) => {
    event.preventDefault()

    const { username, password } = this.state
    const { loginRequest } = this.props

    loginRequest( {
      username,
      password,
    } )
  }

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props }
        handleChange={ this.handleChange }
        handleSubmit={ this.handleSubmit }
      />
    )
  }

}

export default connect(
  null,
  Login.mapDispatchToProps,
)( withAuth( Login ) )