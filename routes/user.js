var models  = require('../models');
var express = require('express');
var router  = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/signin', function(req, res) {

  models.User.findOne({ where: {us_username: req.body.username} }).then(function(user) {
      if(!user) {
        console.log('no user found');
        return res.status(200).json({
          message: 'invalid password',
          error: 2
        });
      }

      bcrypt.compare(req.body.password, user.us_password, function(err, usr) {
          if( !usr ) {
            console.log('invalid password');
            return res.status(200).json({
                message: 'invalid password',
                error: 1
            });;
          }
          else {
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 3600});
            console.log('token: '+token+'userId'+user.userID);
            return res.status(200).json({
                message: 'success',
                token: token,
                error: 0,
                userId: user.userID
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
  models.User.findOne({ where: {
      [Op.or]: [
        { us_username: req.body.username },
        { us_email: req.body.email }
      ] 
    } 
  }).then(function(user) {   
    if(user)
    { 
      if(user.us_username === req.body.username) {  
        console.log('username already exist');      
        return res.status(200).json({
                message: 'username already exist',                
                error: 1                
            });
      }
      else
      if (user.us_email === req.body.email){
        console.log('email already exist');
        return res.status(200).json({
                message: 'email already exist',                
                error: 2                
            });
      }
    }    
    models.User.create({
      us_username: req.body.username,
      us_email: req.body.email,
      us_password: req.body.password
    }).then( function(userNew){
      if(userNew) {
        return res.status(200).json({
          message: 'User Registed',
          error: 0,
          user: user
        });
      }
    });
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
          us_email: req.body.email,
          us_password: hash
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
  models.User.findOne({where: {userID: req.params.id}}).then(function(user) {
    if(user) {
      return res.status(200).json({
        message: 'User Found',
        user: user
      });
    }
  });
});
module.exports = router;
