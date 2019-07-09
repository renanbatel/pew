const express = require( "express" )

const userController = require( "../controllers/user/userController" )
const timelineController = require( "../controllers/user/timelineController" )
const postsController = require( "../controllers/user/postsController" )
const followController = require( "../controllers/user/followController" )

const router = express.Router()

router.post( "/", userController.create )
router.get( "/me", userController.me )
router.get( "/timeline", timelineController.list )
router.post( "/follow/:username", followController.follow )
router.post( "/unfollow/:username", followController.unfollow )
router.get( "/:username", userController.get )
router.get( "/:username/posts", postsController.list )

module.exports = router
