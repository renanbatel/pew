const userDAO = require( "../../dao/user" )

const create = ( request, response ) => {

}

const get = async ( request, response ) => {
  try {
    const { username } = request.params
    const user = await userDAO.getByUsername( username )

    response.send( {
      success: true,
      user,
    } )
  } catch ( error ) {
    console.error( error )
  }
}

const me = ( request, response ) => {

  response.send( request.currentUser )
}

module.exports = {
  create,
  get,
  me,
}
