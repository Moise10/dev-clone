const HttpError = require('../models/http-error');
const Notification = require('../models/notification');


const getAllNotifications = async  (req, res, next) => {
  let {userId} = req.params
  let notifications;
  try{
    await Notification.updateMany({receiver: userId}, {read: true});
    notifications = await Notification.find({receiver: userId})
    .sort({date:'desc'})
    .populate('receiver')
    .populate('post')
    .populate('sender')
    .populate('comment', 'body')
  }catch(err){
    return next(
			new HttpError('Could not fetch notifications, please try again', 500)
		);
  }
  res.json({
    notifications: notifications.map(notification => {
      notification.toObject({getters: true})
    })
  })
}


const getUnreadNotifications = async (req, res, next) => {
  let userId = req.params
  let notifications

  try {
    notifications = await Notification.find({receiver: userId, read: false})
    .populate('sender')
    .populate('receiver')
    .populate('post')
    .populate('comment', 'body')
  } catch (error) {
    return next(
			new HttpError('Could not fetch notifications, please try again', 500)
		);
  }
  res.json({notifications: notifications.map(notification => {
    notification.toObject({getters: true})
  })})
}


const likeNotification = async (senderId, postId, receiverId, next) => {
   //senderId : logged in user
  //receiverId : the user to notify

  try {
    const createdNotification = new Notification({
      notificationType: 'like',
      sender: senderId,
      receiver: receiverId,
      post: postId
    })
    await createdNotification.save()
    return;
  } catch (error) {
    return new HttpError('Could not create the like notification', 500);
  }
}



//remove the notification when like has been deleted
const removeLikeNotification = async (senderId, postId, receiverId, next) =>{
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      sender: senderId,
      post: postId,
      notificationType: 'like'
    })
    return;
  } catch (error) {
    return new HttpError('Could not delete the like notification', 500);
  }
}



const commentNotification = async (receiverId, senderId, commentId, next, postId) =>{
  try {
    const createdNotification = new Notification({
      notificationType: 'comment',
      receiverId: receiverId,
      sender: senderId,
      comment: commentId,
      post: postId
    })
    await createdNotification.save()
    return;
  } catch (error) {
    return new HttpError('Could not create the comment notification', 500);
  }
}

//remove the notification when the comment have been removed 


const removeCommentNotification = async (commentId, senderId, postId, receiverId, next) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      sender: senderId,
      post: postId,
      comment: commentId,
      notificationType: 'comment',
    })
    return;
  } catch (error) {
    return new HttpError('Could not remove the comment notification')
  }
}



const followNotification = async(receiverId, senderId, next) => {
  try {
    const createdNotification = new Notification({
      reveiver: receiverId,
      sender: senderId,
      notificationType: 'follow'
    })
    await createdNotification.save()
    return;
  } catch (error) {
    return new HttpError('Could not create a follow notification')
  }
}


const removeFollowNotification = async (receiverId, senderId, next) => {
  try {
    await Notification.findOneAndDelete({
      reveiver: receiverId,
      sender: senderId,
      notificationType: 'follow'
    })
    return;
  } catch (error) {
    return new HttpError('Could not remove follow notification')
  }
}


exports.likeNotification = likeNotification;
exports.removeLikeNotification = removeLikeNotification;
exports.commentNotification = commentNotification;
exports.removeCommentNotification = removeCommentNotification;
exports.followNotification = followNotification;
exports.removeFollowNotification = removeFollowNotification;
exports.getAllNotifications = getAllNotifications;
exports.getUnreadNotifications = getUnreadNotifications;