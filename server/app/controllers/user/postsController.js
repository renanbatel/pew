const userDAO = require( "../../dao/user" )
const postDAO = require( "../../dao/post" )

const list = async ( request, response ) => {
  try {
    const { username } = request.params
    const user = await userDAO.getByUsername( username )
    const posts = await postDAO.listByUserIds( [ user._id ] )

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