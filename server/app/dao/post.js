const Post = require( "../models/Post" )

const create = ( user, text ) => {
  const now = new Date( Date.now() )

  return new Promise(( resolve, reject ) => {
    Post.create({
      text,
      user: user._id,
      postDate: now.toISOString()
    }, ( error, post ) => {
      if ( error ) {
        reject( error )
      } else {
        Post.populate(
          post,
          { path: "user" },
          ( error, post ) => {
            if ( error ) {
              reject( error )
            } else {
              resolve( post )
            }
          }
        )
      }
    })
  })
}

const listByUserIds = ( userIds ) => {
  const $or = userIds.map( user => ( { user } ))
  const conditions = { $or }
  const options = { sort: { postDate: -1 } }

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
  listByUserIds,
}
