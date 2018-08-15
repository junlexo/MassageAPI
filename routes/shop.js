var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');

router.post('/add', function(req, res) {
  const shopInfo = req.body;
  models.Shop.findOne({
   where: {shop_name: shopInfo.shop_name}
 }).then(function(shop){
  if(shop){
    console.log('this shop already exists');
    return res.status(200).json({
      message: 'Creating shop is unsuccessful',
      shop: shopInfo.shop_name + ' has been already registered'
    });
  }else{
    models.Shop.create({
      shop_name: shopInfo.shop_name,
      address: shopInfo.address,
      service_type: shopInfo.service_type,
      district: shopInfo.district,
      province: shopInfo.province,
      country: shopInfo.country,
      detail_direction: shopInfo.detail_direction,
      phone: shopInfo.phone,
      email: shopInfo.email,
      website: shopInfo.website,
      brief_information: shopInfo.brief_information,
      user_id: shopInfo.user_id
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
  const shopInfo = req.body;
  models.Shop.findById(shopInfo.id).then(function(shop){
    if(shop){
      models.Shop.findOne({
        where: {shop_name: shopInfo.shop_name}
      }).then(isNameExistent => {
        if(isNameExistent && (isNameExistent.shop_name != shop.shop_name)){
          return res.status(200).json({
            message: shopInfo.shop_name + ' has been already registered'
          });
       }else{
         models.Shop.update({
          shop_name: shopInfo.shop_name,
          address: shopInfo.address,
          service_type: shopInfo.service_type,
          district: shopInfo.district,
          province: shopInfo.province,
          country: shopInfo.country,
          detail_direction: shopInfo.detail_direction,
          phone: shopInfo.phone,
          email: shopInfo.email,
          website: shopInfo.website,
          brief_information: shopInfo.brief_information,
          user_id: shopInfo.user_id
        },{ where: {id: shopInfo.id}}).then( function(shop){
          if(shop) {
            return res.status(200).json({
              message: 'This shop has just edited',
              shop: shopInfo.shop_name
            });
          }else{
           return res.status(200).json({
            message: 'Unsuccessfully edit',
            shop: shopInfo.shop_name
          });
         }
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
  const shopId = req.body.id
  models.Shop.destroy({
    where : {id: shopId}
  }).then( function(shop){
    if(shop) {
      return res.status(200).json({
        message: 'Shop has just deleted',
        shopID: shopId
      });
    }else{
      console.log('shop did not exist !')
      return res.status(200).json({
        message: 'Cannot delete',
        shopID: shopId + ' did not exist !'
      });
    }
  });
});

router.get('/list', function(req, res) {
  models.Shop.all().then( function(allshops){
    if(allshops) {
      return res.status(200).json({
        message: 'All Shops are found',
        list: allshops
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
  models.Shop.findOne({
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