const express = require( "express" )
const path = require( "path" )
const cookieParser = require( "cookie-parser" )
const logger = require( "morgan" )
const cors = require( "cors" )

const authentication = require( "./lib/authentication" )
const models = require( "./models" )
const routeIndex = require( "./routes" )
const routeAuth = require( "./routes/auth" )
const routeUser = require( "./routes/user" )
const routePost = require( "./routes/post" )

const app = express()
const corsOptions = {
  origin: "http://localhost:8080"
}

app.use( cors( corsOptions ) )
app.use( logger( "dev" ) )
app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )
app.use( cookieParser() )
// Verifies and sets the current user
app.use( authentication.middleware )

// Routes
app.use( "/", routeIndex )
app.use( "/auth", routeAuth )
app.use( "/user", routeUser )
app.use( "/post", routePost )

// Connect to mongo database
models.connect()

module.exports = app
