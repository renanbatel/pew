const router = require( "express" ).Router()

const signupController = require( "../controllers/signupController" )

router.get( "/", signupController.get )

router.post( "/", signupController.post )

module.exports = router
