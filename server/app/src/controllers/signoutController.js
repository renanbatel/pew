const signinController = require( "../controllers/signinController" )

const post = ( request, response, next ) => {
  const { COOKIE_USERNAME, COOKIE_JWT } = process.env 

  const cookieOptions = {
    maxAge: 0
  }

  response
    .cookie( COOKIE_USERNAME, "", cookieOptions )
    .cookie( COOKIE_JWT, "", cookieOptions )

  signinController.get( request, response, next )
}

module.exports = {
  post
}
