import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Home from "../Home"
import User from "../User"

const View = () => {

  return (
    <BrowserRouter>
      <Route path="/" exact component={ Home } />
      <Route path="/:username" exact component={ User } />
    </BrowserRouter>
  )
}

export default View