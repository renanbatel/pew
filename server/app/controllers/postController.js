const postDAO = require( "../dao/post" )

const create = async ( request, response ) => {
  const { currentUser } = request
  const { text } = request.body

  try {
    const post = await postDAO.create( currentUser, text )

    response.send( {
      success: true,
      post,
    } )
  } catch ( error ) {
    console.error( error )
  }
}

const get = ( request, response ) => {

}

module.exports = {
  create,
  get,
}
