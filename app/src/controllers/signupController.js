const { isEmpty, isEmail } = require( "validator" )

const { isParameterInvalid } = require( "../lib/request" )
const userController         = require( "./userController" )

const isRequestInvalid = ({ body }) => {

  return isParameterInvalid( "name", !isEmpty( body.name ), "You must give your name" )
      || isParameterInvalid( "email", !isEmpty( body.email ), "You must give your email" )
      || isParameterInvalid( "email", isEmail( body.email ), "Your email isn't valid" )
      || isParameterInvalid( "username", !isEmpty( body.username ), "You must give an username" )
      || isParameterInvalid( "password", !isEmpty( body.password ), "You must give an password" )
}

const get = ( request, response, next ) => {

  return response.render( "signup", {
    title: "Sign Up - Pew"
  })
}

const post = async ( request, response, next ) => {
  const isInvalid = isRequestInvalid( request )

  if ( !isInvalid ) {
    const user = await userController.create( request, response, next )

    response.redirect( "/" )
  } else {
    response.render( "signup", {
      ...request.body,
      ...isInvalid 
    })
  }
}

module.exports = {
  get,
  post
}
