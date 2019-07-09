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

module.exports = {
  create,
  getByUsername,
}
