import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  profileRequest,
  profileFollowRequest,
  profileUnfollowRequest,
} from "../../redux/profile"
import withAuth from "../withAuth"
import View from "./View"

class User extends Component {

  static propTypes = {
    profileRequest: PropTypes.func.isRequired,
    profileFollowRequest: PropTypes.func.isRequired,
    profileUnfollowRequest: PropTypes.func.isRequired,
  }

  static mapStateToProps = state => ( {
    profile: state.profile,
  } )

  static mapDispatchToProps = dispatch => bindActionCreators( {
    profileRequest,
    profileFollowRequest,
    profileUnfollowRequest,
  }, dispatch )

  componentWillMount() {
    const { profileRequest, match } = this.props
    const { username } = match.params

    profileRequest( { username } )
  }

  handleFollow = () => {
    console.log( "follow" )
  }

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props } 
        handleFollow={ this.handleFollow }
      />
    )
  }

}

export default connect(
  User.mapStateToProps,
  User.mapDispatchToProps,
)( withAuth( User ) )
