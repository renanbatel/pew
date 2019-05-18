const createError    = require( "http-errors" )
const express        = require( "express" )
const path           = require( "path" )
const cookieParser   = require( "cookie-parser" )
const logger         = require( "morgan" )
const sassMiddleware = require( "node-sass-middleware" )

const indexRouter = require( "./src/routes/index" )
const usersRouter = require( "./src/routes/users" )

const app = express()
const env = process.env.NODE_ENV || "development"

// View engine setup.
app.set( "views", path.join( __dirname, "src/views" ) )
app.set( "view engine", "hbs" )

app.use( logger( "dev" ) )
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( cookieParser() )
app.use( sassMiddleware({
  src: path.join( __dirname, "src" ),
  dest: path.join( __dirname, "public" ),
  indentedSyntax: false,
  sourceMap: env === "production" ? true : false,
  outputStyle: env === "production" ? "compact" : "expanded"
}))
app.use( express.static( path.join( __dirname, "public" ) ) )

// routes
app.use( "/", indexRouter )
app.use( "/users", usersRouter )

// catch 404 and forward to error handler
app.use(( request, response, next ) => {
  next( createError( 404 ) )
})

// error handler
app.use(( error, request, response, next ) => {
  // set locals, only providing error in development
  response.locals.message = error.message
  response.locals.error   = request.app.get( "env" ) === "development" ? error : {}

  // render the error page
  response.status( error.status || 500 )
  response.render( "error" )
})

module.exports = app
