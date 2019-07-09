import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { logoutRequest } from "../../redux/user"
import View from "./View"

class Header extends Component {

  static propTypes = {
    logoutRequest: PropTypes.func.isRequired,
  }

  static mapStateToProps = state => ( {
    user: state.user,
  } )

  static mapDispatchToProps = dispatch => bindActionCreators( {
    logoutRequest,
  }, dispatch )

  handleSignout = () => {
    const { logoutRequest } = this.props

    logoutRequest()
  }

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props } 
        handleSignout={ this.handleSignout }
      />
    )
  }

}

export default connect(
  Header.mapStateToProps,
  Header.mapDispatchToProps,
)( Header )
