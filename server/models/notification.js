const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
	sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	date: { type: Date, default: Date.now() },
  post:{type: mongoose.Schema.Types.ObjectId, ref: "Post"},
  comment:{ type: mongoose.Schema.Types.ObjectId, ref:"Comment"},
  notificationType:{
    type: String,
    enum: ['like', 'comment', 'follow']
  },
  read:{
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Notification', notificationSchema);