const jwt = require( "jsonwebtoken" )

const isPublic = ( path ) => {

  return [ "/auth/signup", "/auth/signin" ].includes( path )
}

const sendToSignin = ( request, response ) => {
  const { COOKIE_JWT } = process.env 

  response
    .cookie( COOKIE_JWT, "", { maxAge: 0 } )
    .redirect( "/" )
}

const middleware = ( request, response, next ) => {
  const { SECRET } = process.env
  const { path } = request

  const authorization = request.headers[ "authorization" ]

  if ( authorization ) {
    const token = authorization.replace( "Bearer ", "" )

    jwt.verify( token, SECRET, ( error, decoded ) => {
      
      if ( error ) {
        response.status( 401 ).send()
      } else {
        request.currentUser = decoded
        next()
      }
    } )
  } else {
    isPublic( path )
      ? next()
      : response
          .status( 401 ) 
          .send()
  }
}

module.exports = {
  middleware
}
