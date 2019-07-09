import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import withAuth from "../withAuth"
import { signupRequest } from "../../redux/user"
import View from "./View"

class Signup extends Component {

  static propTypes = {
    signupRequest: PropTypes.func.isRequired,
  }

  static mapDispatchToProps = dispatch => bindActionCreators( {
    signupRequest,
  }, dispatch )

  state = {
    name: "",
    email: "",
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

    const {
      name,
      email,
      username,
      password,
    } = this.state
    const { signupRequest } = this.props

    signupRequest( {
      name,
      email,
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
  Signup.mapDispatchToProps,
)( withAuth( Signup ) )