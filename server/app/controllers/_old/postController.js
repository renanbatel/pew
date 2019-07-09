const Post = require( "../models/Post" )

const create = ( request, response, next ) => {
  const now = new Date( Date.now() )
  const {
    currentUser,
    body: {
      text
    }
  } = request

  return new Promise(( resolve, reject ) => {
    Post.create({
      text,
      user: currentUser._id,
      postDate: now.toISOString()
    }, ( error, post ) => {
      if ( error ) {
        reject( error )
      } else {
        resolve( post )
      }
    })
  })
}

const listByUserIds = ( request, response, next ) => {
  const { users } = request.body
  const $or       = users.map(( user ) => ({ user }))
  const conditions = { $or }
  const options    = { sort: { postDate: -1 } }

  return new Promise(( resolve, reject ) => {
    Post
      .find( conditions, null, options )
      .populate( "user" )
      .exec(( error, posts ) => {
        if ( error ) {
          reject( error )
        } else {
          resolve( posts )
        }
      })
  })
}

module.exports = {
  create,
  listByUserIds
}
