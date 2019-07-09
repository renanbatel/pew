import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import "./styles/styles.scss"
import makeStore from "./redux"
import App from "./components/App"

const store = makeStore()

render( 
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById( "app" )
)

// For Webpack Hot Module Replacement
!module.hot || module.hot.accept( App )
