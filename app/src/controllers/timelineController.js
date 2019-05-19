const get = async ( request, response, next ) => {
  
  response.render( "timeline", { 
    title: "Pew",
    currentUser: request.currentUser
  })
}

module.exports = {
  get
}
