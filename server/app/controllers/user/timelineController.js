const userDAO = require( "../../dao/user" )
const postDAO = require( "../../dao/post" )

const list = async ( request, response ) => {
  try {
    const { currentUser } = request
    const user = await userDAO.getByUsername( currentUser.username )
    const posts = await postDAO.listByUserIds( [ user._id, ...user.following ] )

    response.send( {
      success: true,
      posts,
    } )
  } catch ( error ) {
    console.error( error )
  }
}

module.exports = {
  list,
}
