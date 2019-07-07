import React from "react"
import { render } from "react-dom"

import "./styles/styles.scss"
import App from "./components/App"

render( <App />, document.getElementById( "app" ) )

// For Webpack Hot Module Replacement
!module.hot || module.hot.accept( App )