const jwt = require( "jsonwebtoken" )

const timelineController = require( "./timelineController" )

const get = ( request, response, next ) => {

  response.render( "signin", {
    title: "Sign In - Pew"
  })
}

const post = ( request, response, next ) => {
  const { username, password } = request.body
  const user = {
    id: 1,
    username: "renan",
    password: "iddqd"
  }

  if ( username === user.username && password === user.password ) {
    const { COOKIE_USERNAME, COOKIE_JWT } = process.env

    const cookieOptions = { maxAge: 9000000 }
    const currentUser   = { id: user.id }
    const token         = jwt.sign( currentUser, process.env.SECRET, {
      expiresIn: 86400
    })

    request.currentUser = currentUser

    response
      .cookie( COOKIE_USERNAME, user.username, cookieOptions )
      .cookie( COOKIE_JWT, token, cookieOptions )
      
    timelineController.get( request, response, next )
  } else {
    
    response
      .status( 401 )
      .render( "signin", {
        title: "Sign In - Pew", 
        error: true,
        message: "Username or password is invalid"
      })
  }
}

module.exports = {
  get,
  post
}
