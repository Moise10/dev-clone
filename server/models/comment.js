const mongoose = require('mongoose');

const commentSchema = new  mongoose.Schema({
  body: {required: true, type: String},
  date:{type: Date, required: true},
  parentPost:{type: mongoose.Types.ObjectId, required: true, ref:"Post"
  },
  parentId:{type: mongoose.Types.ObjectId, required: true, ref: "Comment", default: null
  },
  author: {type: mongoose.Types.ObjectId,required: true, ref: "User",
  },
  likes: {type: mongoose.Types.ObjectId, required: true, ref:"User"
  }
})

module.exports = mongoose.model("Comment", commentSchema)