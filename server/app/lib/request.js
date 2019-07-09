isParameterInvalid = ( name, test, message ) => {
  if ( test ) {

    return !test
  } else {

    return {
      error: {
        [ name ]: true
      },
      message: {
        [ name ]: message
      }
    }
  }
}

module.exports = {
  isParameterInvalid
}
