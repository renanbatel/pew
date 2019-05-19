const router = require( "express" ).Router()

const { getAuthenticatedUser } = require( "../util/authentication" )
const signinController         = require( "../controllers/signinController" )
const signoutController        = require( "../controllers/signoutController" )
const timelineController       = require( "../controllers/timelineController" )

router.get( "/", async ( request, response, next ) => { // signin
  if ( request.currentUser ) {
    console.log( "then here" )
    next()
  } else {
    signinController.get( request, response, next )
  }
}, ( request, response, next ) => { // timeline
  
  timelineController.get( request, response, next )
})

router.post( "/", ( request, response, next ) => {
  const { action } = request.body

  switch ( action ) {
    case "SIGNIN": 
      signinController.post( request, response, next )
      break;
    case "SIGNOUT":
      signoutController.post( request, response, next )
      break;
    default:
      response.redirect( "/" )
  }
})

module.exports = router
