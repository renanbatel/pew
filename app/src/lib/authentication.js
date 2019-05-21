const jwt = require( "jsonwebtoken" )

const signinController = require( "../controllers/signinController" )

const isPublic = ( path ) => {

  return [ "/", "/signup" ].includes( path )
}

const sendToSignin = ( request, response ) => {
  const { COOKIE_JWT } = process.env 

  response
    .cookie( COOKIE_JWT, "", { maxAge: 0 } )
    .redirect( "/" )
}

const middleware = ( request, response, next ) => {
  const { COOKIE_JWT, SECRET } = process.env
  const { path }               = request

  const token = request.cookies[ COOKIE_JWT ]

  if ( token ) {
    jwt.verify( token, SECRET, ( error, decoded ) => {
      
      if ( error ) {
        sendToSignin( request, response )
      } else {
        request.currentUser = decoded
        next()
      }
    })
  } else {
    isPublic( path )
      ? next()
      : sendToSignin( request, response ) 
  }
}

module.exports = {
  middleware
}
