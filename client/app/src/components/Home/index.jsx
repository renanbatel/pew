import React, { Component } from "react"

import View from "./View"

class Home extends Component {

  render() {
    return (
      <View 
        { ...this.state }
        { ...this.props } 
      />
    )
  }

}

export default Home