var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');

router.post('/add', function(req, res) {
  models.Shop_information.findOne({
   where: {email: req.body.email}
    }).then(function(shop){
    if(shop){
      console.log('this email already exists');
      return res.status(200).json({
        message: "Creating shop is unsuccessful",
        shop: "this email has been already registered"
      });
    }else{
      models.Shop_information.create({
        shop_name: req.body.shop_name,
        address: req.body.address,
        service_type: req.body.service_type,
        district: req.body.district,
        province: req.body.province,
        country: req.body.country,
        detail_direction: req.body.detail_direction,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        brief_information: req.body.brief_information
      }).then( function(shop){
        if(shop) {
          return res.status(200).json({
            message: 'Shop has just been created',
            shop: shop.shop_name
          });
        }else{
          return res.status(200).json({
            message: 'Creating shop is unsuccessful',
            warning: 'wrong field'
          });
        }
      });
    }
  });
});

router.post('/edit', function(req, res) {
  models.Shop_information.findById(req.body.id).then(function(shop){
    if(shop){
    	models.Shop_information.update({
        shop_name: req.body.shop_name,
        address: req.body.address,
        service_type: req.body.service_type,
        district: req.body.district,
        province: req.body.province,
        country: req.body.country,
        detail_direction: req.body.detail_direction,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        brief_information: req.body.brief_information
      },{ where: {id: req.body.id}}).then( function(shop){
        if(shop) {
          return res.status(200).json({
            message: 'This shop has just edited',
            shop: req.body.shop_name
          });
        }else{
        	return res.status(200).json({
            message: 'Unsuccessfully edit',
            shop: req.body.shop_name
          });
        }
      });
    }else{
      console.log('This shop is not found!');
      return res.status(200).json({
        message: "Unsuccessfully edit",
        shop: "This shop is not found"
      });
    }
  });
});

router.post('/delete', function(req, res) {
  //var decode = jwt.decode(req.query.token);
  models.Shop_information.destroy({
    where : {id: req.body.id}
  }).then( function(shop){
    if(shop) {
      return res.status(200).json({
        message: 'Shop has just deleted',
        shopID: req.body.id
      });
    }else{
      console.log('shop did not exist !')
      return res.status(200).json({
        message: 'Cannot delete',
        shopID: req.body.id + ' did not exist !'
      });
    }
  });
});

router.get('/list', function(req, res) {
  models.Shop_information.all().then( function(allshop){
    if(allshop) {
      return res.status(200).json({
        message: 'All Shops are found',
        list: allshop
      });
    }else{
      console.log('empty shop !')
      return res.status(200).json({
        message: 'empty shop !'
      });
    }
  });
});

router.post('/find', function(req, res) {
  models.Shop_information.findOne({
   where: { $or: [{id: req.body.id},{shop_name: req.body.shop_name}]}
    }).then( function(shop){
    if(shop) {
      return res.status(200).json({
        message: 'Shop is found',
        shop: shop
      });
    }else{
      console.log('not found !')
      return res.status(200).json({
        message: 'not found !'
      });
    }
  });
});

module.exports = router;