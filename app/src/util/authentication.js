const jwt = require( "jsonwebtoken" )

const signinController = require( "../controllers/signinController" )

const isPublic = ( path ) => {

  return [ "/", "/signup" ].includes( path )
}

const sendToSignin = ( resolve, request, response ) => {
  const { COOKIE_JWT } = process.env 

  resolve( false )
  response
    .cookie( COOKIE_JWT, "", { maxAge: 0 } )
    .status( 401 )
  signinController.get( request, response )
}

const middleware = ( request, response, next ) => {
  const { COOKIE_JWT, SECRET } = process.env
  const { path }               = request

  const token = request.cookies[ COOKIE_JWT ]

  if ( token ) {
    jwt.verify( token, SECRET, ( error, decoded ) => {
      
      if ( error ) {
        sendToSignin( resolve, request, response )
      } else {
        console.log( "im here" )
        request.currentUser = decoded
        next()
      }
    })
  } else {
    isPublic( path )
      ? next()
      : sendToSignin( resolve, request, response ) 
  }
}

module.exports = {
  middleware
}
