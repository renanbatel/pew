const { isEmpty, isLength } = require( "validator" )

const { isParameterInvalid } = require( "../lib/request" )
const postController         = require( "./postController" )
const timelineController     = require( "./timelineController" )

const isRequestInvalid = ({ body }) => {

  return isParameterInvalid( "text", !isEmpty( body.text ), "You must write something to post it" )
      || isParameterInvalid( "text", isLength( body.text, { max: 140 } ), "The post can have only 140 characters" )
}

const renderTimeline = async ( request, response, next, parameters ) => {
  const posts = await timelineController.get( request, response, next )

  response.render( "home", {
    ...parameters,
    currentUser: request.currentUser,
    posts
  })
}

const get = async ( request, response, next ) => {
  
  renderTimeline( request, response, next, {
    title: "Pew"
  })
}

const post = async ( request, response, next ) => {
  const isInvalid = isRequestInvalid( request )

  if ( !isInvalid ) {
    const post = await postController.create( request, response )

    response.redirect( "/" )
  } else {

    renderTimeline( request, response, next, {
      title: "Pew",
      ...request.body,
      ...isInvalid
    })
  }
}

module.exports = {
  get,
  post
}
