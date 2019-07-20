const userDAO = require( "../../dao/user" )

const follow = async ( request, response ) => {
  try {
    const { currentUser } = request
    const { username } = request.params
    const user = await userDAO.getByUsername( username )
    await userDAO.addFollowing( currentUser._id, user._id )

    response.send( {
      success: true,
      currentUser,
    } )
  } catch ( error ) {
    console.error( error )
  }
}

const unfollow = async ( request, response ) => {
  try {
    const { currentUser } = request
    const { username } = request.params
    const user = await userDAO.getByUsername( username )
    await userDAO.removeFollowing( currentUser._id, user._id )

    response.send( {
      success: true,
      currentUser,
    } )
  } catch ( error ) {
    console.error( error )
  }
}

module.exports = {
  follow,
  unfollow,
}
