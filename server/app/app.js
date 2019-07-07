const createError    = require( "http-errors" )
const express        = require( "express" )
const path           = require( "path" )
const cookieParser   = require( "cookie-parser" )
const logger         = require( "morgan" )
const helmet         = require( "helmet" )
const sassMiddleware = require( "node-sass-middleware" )
const favicon        = require( "serve-favicon" )
const hbs            = require( "hbs" )
const hbsIntl        = require( "handlebars-intl" )

const authentication = require( "./src/lib/authentication" )
const indexRouter    = require( "./src/routes/index" )
const signupRouter   = require( "./src/routes/signup" )
const models         = require( "./src/models" )

const env = process.env.NODE_ENV || "development"

const app = express()

// View engine setup.
app.set( "views", path.join( __dirname, "src/views" ) )
app.set( "view engine", "hbs" )

app.use( logger( "dev" ) )
app.use( helmet() )
app.use( favicon( path.join( __dirname, "public/images", "logo.png" ) ) )
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

// verifies and sets the current user
app.use( authentication.middleware ) 

// routes ( must be in that order )
app.use( "/signup", signupRouter )
app.use( "/", indexRouter )

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


hbsIntl.registerWith( hbs )
// set views partials
hbs.registerPartials( path.join( __dirname, "src/views/partials" ) )

// connect to the database
models.connect()

module.exports = app
