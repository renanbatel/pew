const jwt         = require( "jsonwebtoken" )
const { sha256 }  = require( "js-sha256" )
const { isEmpty } = require( "validator" )

const { isParameterInvalid } = require( "../lib/request" )
const homeController         = require( "./homeController" )
const userController         = require( "./userController" )

const isRequestInvalid = ({ body }) => {

  return isParameterInvalid( "username", !isEmpty( body.username ), "Please, tell us your username" )
      || isParameterInvalid( "password", !isEmpty( body.password ), "You must give your password" )
}

const get = ( request, response, next ) => {

  response.render( "signin", {
    title: "Sign In - Pew"
  })
}

const post = async ( request, response, next ) => {
  const isInvalid = isRequestInvalid( request )

  if ( !isInvalid ) {
    const { username, password } = request.body

    const user = await userController.getByUsername( request, response, next )
    
    if ( user && username === user.username && sha256( password ) === user.password ) {
      const { COOKIE_USERNAME, COOKIE_JWT } = process.env

      const cookieOptions = { maxAge: 9000000 }
      const currentUser   = { 
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      }
      const token         = jwt.sign( currentUser, process.env.SECRET, {
        expiresIn: 86400
      })

      request.currentUser = currentUser

      response
        .cookie( COOKIE_USERNAME, user.username, cookieOptions )
        .cookie( COOKIE_JWT, token, cookieOptions )
        
      homeController.get( request, response, next )
    } else {
      
      response
        .status( 401 )
        .render( "signin", {
          title: "Sign In - Pew", 
          error: {
            auth: true
          },
          message: {
            auth: "Username or password is invalid"
          }
        })
    }
  } else {

    response
      .render( "signin", {
        title: "Sign In - Pew",
        ...request.body,
        ...isInvalid
      })
  }
}

module.exports = {
  get,
  post
}
