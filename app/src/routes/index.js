const router = require( "express" ).Router()

const signinController  = require( "../controllers/signinController" )
const signoutController = require( "../controllers/signoutController" )
const homeController    = require( "../controllers/homeController" )
const profileController = require( "../controllers/profileController" )

router.get( "/", async ( request, response, next ) => { // signin
  if ( request.currentUser ) {
    next()
  } else {
    signinController.get( request, response, next )
  }
}, ( request, response, next ) => { // timeline
  
  homeController.get( request, response, next )
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
    case "POST":
      homeController.post( request, response, next )
      break;
    default:
      response.redirect( "/" )
  }
})

router.get( "/:username", profileController.get )
router.post( "/:username", profileController.post )

module.exports = router
