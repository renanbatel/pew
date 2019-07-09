const jwt = require( "jsonwebtoken" )
const { sha256 } = require( "js-sha256" )

const userDAO = require( "../dao/user" )

const signin = async ( request, response ) => {
  const { username, password } = request.body

  const user = await userDAO.getByUsername( username )
  
  if ( user && username === user.username && sha256( password ) === user.password ) {
    const currentUser = { 
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email
    }
    const token = jwt.sign( currentUser, process.env.SECRET, {
      expiresIn: 86400
    } )
      
    response.send( {
      success: true,
      token,
      currentUser,
    } )
  } else {
    
    response
      .status( 401 )
      .send( {
        error: true,
        message: "Username or password invalid"
      } )
  }
}

const signup = async ( request, response ) => {
  try {
    const user = await userDAO.create( request.body )

    response.send( {
      success: true,
      user,
    } )
  } catch ( error ) {
    response.status( 500 ).send( {
      error: true,
      stack: error,
    } )
    throw error
  }
}

module.exports = {
  signin,
  signup,
}
