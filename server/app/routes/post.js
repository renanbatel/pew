const express = require( "express" )

const postController = require( "../controllers/postController" )

const router = express.Router()

router.post( "/", postController.create )
router.get( "/:id", postController.get )

module.exports = router
