const mongoose = require( "mongoose" )

const connect = () => {
  const {
    DBPROTOCOL,
    DBHOST,
    DBPORT,
    DBNAME,
    DBUSER,
    DBPASS,
    DBOPTIONS,
  } = process.env

  mongoose.connect(
    DBPROTOCOL === "mongodb+srv"
      ? `${ DBPROTOCOL }://${ DBUSER }:${ escape( DBPASS ) }@${ DBHOST }/${ DBNAME }${ DBOPTIONS }`
      : `${ DBPROTOCOL }://${ DBUSER }:${ escape( DBPASS ) }@${ DBHOST }:${ DBPORT }/${ DBNAME }${ DBOPTIONS }`,
    {
      useNewUrlParser: true,
    },
  )
}

const disconnect = () => {
  mongoose.connection.close()
}

module.exports = {
  connect,
  disconnect,
}
