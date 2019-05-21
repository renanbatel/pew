const mongoose = require( "mongoose" )

const connect = () => {
  const {
    DBHOST,
    DBPORT,
    DBNAME,
    DBUSER,
    DBPASS
  } = process.env
  
  mongoose.connect(
    `mongodb://${ DBUSER }:${ escape( DBPASS ) }@${ DBHOST }:${ DBPORT }/${ DBNAME }`,
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
