const mongoose = require( "mongoose" )

const connect = () => {
  const {
    DBPROTOCOL,
    DBHOST,
    DBPORT,
    DBNAME,
    DBUSER,
    DBPASS
  } = process.env
  
  mongoose.connect(
    DBPROTOCOL === "mongodb+srv"
      ? `${ DBPROTOCOL }://${ DBUSER }:${ escape( DBPASS ) }@${ DBHOST }/${ DBNAME }`
      : `${ DBPROTOCOL }://${ DBUSER }:${ escape( DBPASS ) }@${ DBHOST }:${ DBPORT }/${ DBNAME }`,
    {
      useNewUrlParser: true
    }
  )
}

const disconnect = () => {
  mongoose.connection.close()
}

module.exports = {
  connect,
  disconnect
}
