const { v4:uuid} = require('uuid');
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')
const {
  commentNotification, 
  removeCommentNotification
} = require('./notifications')


