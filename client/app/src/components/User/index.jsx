import React, { Component } from "react"

import View from "./View"

class User extends Component {

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props } 
      />
    )
  }

}

export default User