const { sha256 } = require( "js-sha256" )

const User = require( "../models/User" )

const create = ( user ) => {
  const now = new Date( Date.now() )
  const {
    name,
    username,
    email,
    password
  } = user

  return new Promise(( resolve, reject ) => {
    User.create({
      name,
      username,
      email,
      password: sha256( password ),
      joinDate: now.toISOString(),
      following: [],
      followers: []
    }, ( error, user ) => {
      if ( error ) {
        reject( error )
      } else {
        resolve( user )
      }
    } )
  } )
}

const getByUsername = ( username ) => {

  return new Promise(( resolve, reject ) => {
    User.findOne({
      username
    }, ( error, user ) => {
      if ( error ) {
        reject( error )
      } else {
        resolve( user )
      }
    })
  })
}

const updateFollow = ( currentUserId, userId, action ) => {
  const method = action === "follow" 
    ? "$push" 
    : "$pull"

  return new Promise(( resolve, reject ) => {
    User
      .findById( currentUserId )
      .updateOne({ [ method ]: { following: userId } })
      .exec(( error ) => {
        if ( error ) {
          reject( error )
        } else {
          User
            .findById( userId )
            .updateOne({ [ method ]: { followers: currentUserId } })
            .exec(( error, user ) => {
              if ( error ) {
                reject( error )
              } else {
                resolve( user )
              }
            })
        }
      })
  })
}

const addFollowing = async ( currentUserId, userId ) => {
  return await updateFollow( currentUserId, userId, "follow" )
}

const removeFollowing = async ( currentUserId, userId ) => {
  return await updateFollow( currentUserId, userId, "unfollow" )
}

module.exports = {
  create,
  getByUsername,
  addFollowing,
  removeFollowing,
}
