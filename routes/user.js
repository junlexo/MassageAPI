var models  = require('../models');
var express = require('express');
var router  = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signin', function(req, res) {
  models.User.findOne({ where: {username: req.body.username} }).then(function(user) {
      if(!user) {
        console.log('no user found');
        return;
      }

      bcrypt.compare(req.body.password, user.password, function(err, usr) {
          if( !usr ) {
            console.log('invalid password');
            return;
          }
          else {
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 3600});
            console.log('token: '+token+'userId'+user.id);
            return res.status(200).json({
                message: 'success',
                token: token,
                userId: user.id
            });
          }
      });
  });
});
router.get('/all', function(req, res, next){
  models.User.findAll().then(function(users) {
    if(users) {
      return res.status(200).json({
        message: 'Users Found',
        users: users
      });
    }
  });
});
router.get('/remove/:id', function(req, res, next){
  models.User.destroy({where : {username: req.params.id}}).then(function (resp) {       
        if(resp)
          return res.status(200).json({
            remove: true,
            message: 'User Removed',        
          });
        else
          return res.status(200).json({
            remove: false,
            message: 'Cannot Remove User',        
          });
      });
});
router.post('/register', function(req, res) {
  var decode = jwt.decode(req.query.token);
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then( function(user){
    if(user) {
      return res.status(200).json({
        message: 'User Registed',
        user: user
      });
    }
  });
});
router.post('/update', function(req, res) {  
  var decode = jwt.decode(req.query.token); 
  models.User.findOne({ where: { username: req.body.username } })
  .then(function (user) {
    // Check if record exists in db  
    if (user) {   
      bcrypt.hash(req.body.password, 10, function(err, hash) {
    // Store hash in database    
        user.update({
          email: req.body.email,
          password: hash
        })
        .then(function (resp) {
          if(resp)
            return res.status(200).json({
              message: 'User Updated',
              user: resp
            });
        })
      });
    }
  });
});
router.get('/single/:id', function(req, res, next){
  models.User.findOne({where: {username: req.params.id}}).then(function(user) {
    if(user) {
      return res.status(200).json({
        message: 'User Found',
        user: user
      });
    }
  });
});
module.exports = router;
