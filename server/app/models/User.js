const mongoose = require( "mongoose" )

const userSchema = {
  name: String,
  username: String,
  email: String,
  password: String,
  joinDate: Date,
  following: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}

module.exports = mongoose.model( "User", userSchema )
