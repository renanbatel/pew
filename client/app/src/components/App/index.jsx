import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  loginRequest,
  updateLoading,
} from "../../redux/user"
import { KEY_JWT } from "../../config"
import View from "./View"

class App extends Component {

  static propTypes = {
    user: PropTypes.instanceOf( Object ).isRequired,
  }

  static mapStateToProps = state => ( {
    user: state.user,
  } )

  static mapDispatchToProps = dispatch => bindActionCreators( {
    loginRequest,
    updateLoading,
  }, dispatch )

  componentWillMount() {
    const token = localStorage.getItem( KEY_JWT )

    if ( token ) {
      const { loginRequest } = this.props

      loginRequest( { token } )
    } else {
      const { updateLoading } = this.props

      updateLoading( false )
    }
  }

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props } 
      />
    )
  }

}

export default connect(
  App.mapStateToProps,
  App.mapDispatchToProps,
)( App )
