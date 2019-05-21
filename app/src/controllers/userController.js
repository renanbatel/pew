const { sha256 } = require( "js-sha256" )

const User = require( "../models/User" )

const create = ( request, response, next ) => {
  const now = new Date( Date.now() )
  const {
    name,
    username,
    email,
    password
  } = request.body

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
    })
  })
}

const getByUsername = ( request, response, next ) => {
  const { username } = request.body

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

const getById = ( request, response, next ) => {
  const { id } = request.body

  return new Promise(( resolve, reject ) => {
    User.findById(
      id,
      ( error, user ) => {
        if ( error ) {
          reject( error )
        } else {
          resolve( user )
        }
      }
    )
  })
}

const getCurrent = ( request, response, next ) => {
  const { currentUser } = request

  return new Promise(( resolve, reject ) => {
    User.findById(
      currentUser._id,
      ( error, user ) => {
        if ( error ) {
          reject( error )
        } else {
          resolve( user )
        }
      }
    )
  })
}

const updateFollow = ( currentUser, user, action ) => {
  const method = action === "follow" 
    ? "$push" 
    : "$pull"

  return new Promise(( resolve, reject ) => {
    User
      .findById( currentUser._id )
      .updateOne({ [ method ]: { following: user } })
      .exec(( error ) => {
        if ( error ) {
          reject( error )
        } else {
          User
            .findById( user )
            .updateOne({ [ method ]: { followers: currentUser._id } })
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

const addFollowing = async ( request, response, next ) => {
  const { currentUser } = request
  const { user }        = request.body

  return await updateFollow( currentUser, user, "follow" )
}

const removeFollowing = async ( request, response, next ) => {
  const { currentUser } = request
  const { user }        = request.body

  return await updateFollow( currentUser, user, "unfollow" )
}

module.exports = {
  create,
  getById,
  getByUsername,
  getCurrent,
  addFollowing,
  removeFollowing
}
