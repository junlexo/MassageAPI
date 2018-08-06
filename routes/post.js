var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

/* --------------------------------------- */

router.get('/all', function(req, res, next){
  models.Post.findAll().then(function(posts) {
    if(posts) {
      return res.status(200).json({
        message: 'Posts Found',
        posts: posts
      });
    }
  });
});

router.get('/single/:id', function(req, res, next){
  models.Post.findById(req.params.id).then(function(post) {
    if(post) {
      return res.status(200).json({
        message: 'Post Found',
        post: post
      });
    }
  });
});

router.use('/',function(req, res, next){
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err) {
      return res.status(401).json({
        title: 'Authenticaiton Failed!',
        error: err
      });
    }
    next();
  })
});

router.post('/upload', upload.array('uploads', 12), function(req, res) {
  console.log(req.files);
  console.log(req.body.id);
  return res.status(200).json({
      message: 'File Uploaded',
  });
});

router.post('/createpost', function(req, res) {
  var decode = jwt.decode(req.query.token);
  models.Post.create({
    title: req.body.title,
    body: req.body.body,
    UserId: decode.user.id
  }).then( function(post){
    if(post) {
      return res.status(200).json({
        message: 'Post Created',
        post: post
      });
    }
  });
});

module.exports = router;
