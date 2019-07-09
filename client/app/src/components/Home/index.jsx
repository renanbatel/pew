import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import withAuth from "../withAuth"
import { timelineRequest, timelinePostRequest } from "../../redux/timeline"
import View from "./View"

class Home extends Component {

  static propTypes = {
    timelineRequest: PropTypes.func.isRequired,
    timelinePostRequest: PropTypes.func.isRequired,
  }

  static mapStateToProps = state => ( {
    timeline: state.timeline,
  } )

  static mapDispatchToProps = dispatch => bindActionCreators( {
    timelineRequest,
    timelinePostRequest,
  }, dispatch )

  state = {
    text: "",
  }

  componentWillMount() {
    const { timelineRequest } = this.props

    timelineRequest()
  }

  handleChange = ( { currentTarget } ) => {
    const { value } = currentTarget

    this.setState( {
      text: value,
    } )
  }

  handleSubmit = ( event ) => {
    event.preventDefault()

    const { text } = this.state
    const { timelinePostRequest } = this.props
    
    timelinePostRequest( { text } )
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
  Home.mapStateToProps,
  Home.mapDispatchToProps,
)( withAuth( Home ) )