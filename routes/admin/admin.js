var express = require('express');
var models  = require('../../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.post('/signin', function(req, res) {
  models.Admin.findOne({ where: {ad_username: req.body.username} }).then(function(admin) {
      if(!admin) {
        console.log('no admin found');
        return;
      }

      bcrypt.compare(req.body.password, admin.ad_password, function(err, usr) {
          if( !usr ) {
            console.log('invalid password');
            return;
          }
          else {
            var token = jwt.sign({admin: admin}, 'secret', {expiresIn: 3600});
            console.log('token: '+token+'adminId'+admin.adminID);
            return res.status(200).json({
                message: 'success',
                token: token,
                adminID: admin.adminID
            });
          }
      });
  });
});

router.get('/all', function(req, res, next){   
  models.Admin.findOnendAll().then(function(admins) {
    if(admins) {
      return res.status(200).json({
        message: 'admins Found',        
        admins: admins
      });
    }
  });
});
router.get('/remove/:id', function(req, res, next){
  models.Admin.destroy({where : {adminID: req.params.id}}).then(function (resp) {       
        if(resp)
          return res.status(200).json({
            remove: true,
            message: 'Admin Removed',        
          });
        else
          return res.status(200).json({
            remove: false,
            message: 'Cannot Remove Admin',        
          });
      });
});
router.post('/register', function(req, res) {
	console.log(req.body);
  models.Admin.findOne({ where: {
      [Op.or]: [
        { ad_username: req.body.username },
        { ad_email: req.body.email }
      ] 
    } 
  }).then(function(admin) {   
    if(admin)
    { 
      if(admin.ad_username === req.body.username) {  
        console.log('username already exist');      
        return res.status(200).json({
                message: 'username already exist',                
                error: 1                
            });
      }
      else if (admin.ad_email === req.body.email){
        console.log('email already exist');
        return res.status(200).json({
                message: 'email already exist',                
                error: 2                
            });
      }
    }
    else{
    models.Admin.create({
      ad_username: req.body.username,
      ad_email: req.body.email,
      ad_password: req.body.password,
      ad_tel: req.body.tel
    }).then( function(userNew){
      if(userNew) {
        return res.status(200).json({
          message: 'User Registed',
          error: 0,
          admin: userNew
        });
      }
    });
	}
  });  
});
router.post('/update', function(req, res) {  
  var decode = jwt.decode(req.query.token); 
  models.Admin.findOne({ where: { username: req.body.username } })
  .then(function (admin) {
    // Check if record exists in db  
    if (admin) {   
      bcrypt.hash(req.body.password, 10, function(err, hash) {
    // Store hash in database    
        admin.update({
          ad_email: req.body.email,
          ad_tel: req.body.tel,
          ad_password: hash        
        })
        .then(function (resp) {
          if(resp)
            return res.status(200).json({
              message: 'User Updated',
              admin: resp
            });
        })
      });
    }
  });
});
router.get('/single/:id', function(req, res, next){
  models.Admin.findOne({where: {adminID: req.params.id}}).then(function(admin) {
    if(admin) {
      return res.status(200).json({
        message: 'admin Found',
        admin: admin
      });
    }
  });
});

module.exports = router;
