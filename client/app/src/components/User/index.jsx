import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  profileRequest,
  profileFollowRequest,
  profileUnfollowRequest,
  profileUpdateLoading,
} from "../../redux/profile"
import withAuth from "../withAuth"
import View from "./View"

class User extends Component {

  static propTypes = {
    user: PropTypes.instanceOf( Object ).isRequired,
    profile: PropTypes.instanceOf( Object ).isRequired,
    profileRequest: PropTypes.func.isRequired,
    profileFollowRequest: PropTypes.func.isRequired,
    profileUnfollowRequest: PropTypes.func.isRequired,
  }

  static mapStateToProps = state => ( {
    user: state.user,
    profile: state.profile,
  } )

  static mapDispatchToProps = dispatch => bindActionCreators( {
    profileRequest,
    profileFollowRequest,
    profileUnfollowRequest,
    profileUpdateLoading,
  }, dispatch )

  componentWillMount() {
    const { profileRequest, match } = this.props
    const { username } = match.params

    profileUpdateLoading( true )
    profileRequest( { username } )
  }

  handleFollow = () => {
    const {
      user,
      profile,
      profileFollowRequest,
      profileUnfollowRequest,
    } = this.props
    const { username } = profile.content.user

    if ( profile.content.user.followers.includes( user.current._id ) ) {
      profileUnfollowRequest( { username } )
    } else {
      profileFollowRequest( { username } )
    }
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
