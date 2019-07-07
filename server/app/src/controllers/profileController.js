const userController     = require( "./userController" )
const timelineController = require( "./timelineController" )

const get = async ( request, response, next ) => {
  const { currentUser } = request

  request.body.username = request.params.username

  const user  = await userController.getByUsername( request, response, next )
  const posts = await timelineController.getUserOnly( request, response, next )
  
  response.render( "profile", {
    title: `${ user.name } - Pew`,
    currentUserProfile: user._id == currentUser._id,
    follows: user.followers.includes( currentUser._id ),
    count: {
      following: user.following.length,
      followers: user.followers.length
    },
    currentUser,
    user,
    posts
  })
}

const follow = async ( request, response, next ) => {
  const { username } = request.params

  const user = await userController.addFollowing( request, response, next )

  response.redirect( `/${ username }` )
}

const unfollow = async ( request, response, next ) => {
  const { username } = request.params

  const user = await userController.removeFollowing( request, response, next )

  response.redirect( `/${ username }` )
}

const post = async ( request, response, next ) => {
  const { action } = request.body

  switch ( action ) {
    case "FOLLOW":
      follow( request, response, next )
      break;
    case "UNFOLLOW":  
      unfollow( request, response, next )
      break;  
    default:
      response.redirect( `/${ username }` )
  }
}

module.exports = {
  get,
  post
}
