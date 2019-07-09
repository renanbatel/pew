import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"

import Home from "../Home"
import Login from "../Login"
import Signup from "../Signup"
import User from "../User"
import Header from "../Header"

const View = ( {
  user,
} ) => {
  
  return (
    <BrowserRouter>
      {
        !user.loading && user.current
          ? <Header />
          : ""
      }
      <main>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/login" exact component={ Login } />
          <Route path="/signup" exact component={ Signup } />
          <Route path="/:username" exact component={ User } />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

View.propTypes = {
  user: PropTypes.instanceOf( Object ).isRequired,
}

export default View