const mongoose = require( "mongoose" )

const postSchema = {
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  postDate: Date
}

module.exports = mongoose.model( "Post", postSchema )
