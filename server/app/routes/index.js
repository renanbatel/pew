const express = require( "express" )

const router = express.Router()

router.get( "/", ( request, response, next ) => {
  response.send( {
    name: "Pew REST API",
    version: "1.0.0",
  } )
} )

module.exports = router
