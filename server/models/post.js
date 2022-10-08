const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title:{
    type:String, required: true
  },
  image:{
    type: String, required: true
  },
  body:{
    type:String, required: true
  },
  tags:[{type: mongoose.Types.ObjectId, required: true, ref: "Tag"}],
  date:{
    type: Date, default: Date.now()
  },
  titleURL:{
    type: String, required: true
  },
  likes:[{type: mongoose.Types.ObjectId, ref: "User"}],
  bookmarks:[{type: mongoose.Types.ObjectId, ref:'User'}],
  comments:{
    type: mongoose.Types.ObjectId, ref:"Comment", required: true
  },
  author: {
    type: mongoose.Types.ObjectId, ref:"User", required: true
  },
  unicorns: [{type: mongoose.Types.ObjectId, ref:"User"}]

})


module.exports = mongoose.model("Post", postSchema)