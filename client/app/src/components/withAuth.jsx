import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import PropTypes from "prop-types"

import Loading from "./Loading"

const withAuth = ( Child ) => {

  class Auth extends Component {

    static ALLOWED_PATHS = [ "/login", "/signup" ]

    static propTypes = {
      user: PropTypes.instanceOf( Object ).isRequired,
    }

    static mapStateToProps = state => ( {
      user: state.user,
    } )

    check() {
      const {
        user,
        location,
        history,
      } = this.props

      if ( !user.loading ) {
        if ( user.current && Auth.ALLOWED_PATHS.includes( location.pathname ) ) {
          history.push( "/" )
        } else if ( !user.current && !Auth.ALLOWED_PATHS.includes( location.pathname ) ) {
          history.push( "/login" )
        }
      }
    }

    componentWillMount() {
      this.check()
    }

    componentDidUpdate() {
      this.check()
    }

    render() {
      const { user } = this.props

      return user.loading
        ? (
          <Loading />
        ) : (
          <Child
            { ...this.state }
            { ...this.props }
          />
        )
    }
  }

  return connect(
    Auth.mapStateToProps,
  )( withRouter( Auth ) )
}

export default withAuth
