const router = require( "express" ).Router()

router.get( "/", ( request, response, next ) => {

  response.render( "signup" )
})

module.exports = router
