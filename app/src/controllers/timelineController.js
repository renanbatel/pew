const userController = require( "./userController" )
const postController = require( "./postController" )

const getPosts = async ( request, response, next ) => {
  const posts = await postController.listByUserIds( request, response, next )

  return posts
}

const getUserOnly = async ( request, response, next ) => {
  const user = await userController.getByUsername( request, response, next )
  
  request.body.users = [ user._id ]

  return await getPosts( request, response, next )
}

const get = async ( request, response, next ) => {
  const user = await userController.getCurrent( request, response, next )

  request.body.users = [ user._id, ...user.following ]

  return await getPosts( request, response, next )
}

module.exports = {
  getUserOnly,
  get
}
