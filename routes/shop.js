var models  = require('../models');
var express = require('express');
var router  = express.Router();
var multer  =   require('multer');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var mkdirp = require('mkdirp');

// var storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     var dir = _basedir + '/data/images/shop/'+ req.body.shop_name;
//     if (!fs.existsSync(dir)){
//       mkdirp.sync(dir, function (err) {
//        if (err) 
//         console.error(err);
//     });
//     }
//     console.log(dir);
//     callback(null, dir)
//   },
//   filename: function(req, file, callback) {
//     console.log(req.body)
//     console.log(file)
//     callback(null, file.fieldname + '-' + Date.now() + file.originalname)
//   }
// })
// var upload = multer({
//   storage: storage
// }).array('file',10)

var tmp_shopID;
var shopPhotoDir = './data/images/shop/';
var photoCount = 0;
var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      var dir = shopPhotoDir + tmp_shopID + '/';
      if (!fs.existsSync(dir)){
        mkdirp.sync(dir, function (err) {
         if (err) 
          console.error(err);
      });
      }
      callback(null, dir)
    },
    filename: function(req, file, callback) {
      console.log(file);
      callback(null, file.fieldname + '_' + Date.now() + '-' + file.originalname)
    }
  })
}).array('shopPhotos',10);

router.post('/add', function(req, res) {
  const shopReq = req.body;
  console.log(shopReq);
  models.Shop.findOne({
   where: {$or: [{shop_name: shopReq.shop_name},{adminID: shopReq.adminID}]
 }}).then(function(isFound){
  if(isFound){
    console.log('this shop already exists');
    // console.log(isFound);
    return res.status(200).json({
      message: 'Creating shop is unsuccessful',
      shop: isFound.shop_name + ' has been already registered',
      error: 1
    }); 
  }else{
    let statusID;
    models.Status.findOne({where: {status_title: "processing"}}).then( status=>{
      if(status){
        statusID = status.statusID;
      }else{
        statusID = "";
      }
      models.Shop.create({
      shop_name: shopReq.shop_name,
      shop_addr: shopReq.shop_addr,
      provinceID: shopReq.provinceID,
      countryID: shopReq.countryID,
      shop_website: shopReq.shop_website,  
      //shop_photo: _basedir + '/data/images/shop/'+ shopReq.shop_name,
      shop_desc: shopReq.shop_desc,
      serviceID: shopReq.serviceID,  
      adminID: shopReq.adminID,
      statusID: statusID
    }).then( function(createdShop){
      if(createdShop) {
        tmp_shopID = createdShop.shopID;
        //shopPhotoDir = './data/images/shop/' + createdShop.shopID + '/';
        return res.status(200).json({
          message: 'Shop has just been created',
          shop: createdShop,
          error: 0
        });
      }else{
        return res.status(200).json({
          message: 'Creating shop is unsuccessful',
          warning: 'wrong field',
          error: 2
        });
      }
    });
    });
  }
});
});

router.post('/addPhoto', function(req, res){
  // console.log("add photo " + tmp_shopID);
  models.Shop.findOne({where: {shopID: tmp_shopID}}).then(shop =>{
    if(shop){
      upload(req,res,function(err) {
        if(err) {
          return res.end(err+ " Error uploading file.");
        }
          //res.status(200).json({'file': req.files});
          //   fs.readdir(shopPhotoDir, (err, files) => {
          //   if (err) throw err;
          //   for (const file of files) {
          //     fs.unlink(shopPhotoDir + file, err => {
          //       if (err) throw err;
          //     });
          //   }
          // });
        });
      var dir = shopPhotoDir.slice(1) + tmp_shopID + '/';
      shop.update({shop_photo: dir}).then(updatedShop => {
        if(updatedShop){
          return res.status(200).json({
            message: 'Shop has just been created',
            shop: updatedShop,
            error: 0
          });
        }else{
          return res.status(200).json({
            message: 'Creating shop is unsuccessful',
            warning: 'wrong field',
            error: 2
          });
        }
      });
    }else{
      return res.status(200).json({
        message: 'Creating shop is unsuccessful',
        warning: 'wrong field',
        error: 2
      });
    }
  });
});

router.post('/edit', function(req, res) {
  const shop = req.body;
  models.Shop.findOne({where: {shop_name: shop.shop_name}}).then(function(shop){
    if(shop){
      return res.status(200).json({
        message: shop.shop_name + " has been already registered",
        error: 1
      });
    }else{
      models.Shop.update(shop,{where: {shopID: shop.shopID}}).then(newShop => {
        if(newShop){
          return res.status(200).json({
            message: "update successfully",
            error: 0
          });
        }
        else{
          return res.status(200).json({
            message: "update unsuccessfully",
            error: 2
          });
        }
      });
    }
  });
});

router.delete('/delete/:id', function(req, res) {
  //var decode = jwt.decode(req.query.token);
  const shopId = req.params.id;
  models.Shop.destroy({
    where : {shopID: shopId}
  }).then( function(isDeleted){
    if(isDeleted) {
      return res.status(200).json({
        message: 'Shop has just deleted',
        shopID: shopId,
        error: 0
      });
    }else{
      console.log('shop did not exist !')
      return res.status(200).json({
        message: 'Cannot delete',
        shopID: shopId + ' did not exist !',
        error: 1
      });
    }
  });
});

router.get('/all', function(req, res) {
  models.Shop.all({ include: [{
    model: models.Admin,
    //as: 'more_info',
    attributes: ['ad_tel','ad_email']
    //where: {adminID: models.Shop.adminID}
  }]}).then( function(allshops){
    if(allshops) {
      return res.status(200).json({
        message: 'All Shops are found',
        list: allshops,
        error: 0
      });
    }else{
      console.log('empty shop !')
      return res.status(200).json({
        message: 'empty shop !',
        error: 1
      });
    }
  });
});

router.get('/belongsto/:adminID', function(req, res) {
  models.Shop.all({
    where: {adminID: req.params.adminID},
    include: [
    {
    model: models.Province,
    attributes: ['province_name']
  },{
    model: models.Country,
    attributes: ['country_name']
  },{
    model: models.Status,
    attributes: ['status_title']
  },{
    model: models.Service,
    attributes: ['service_title']
  }]
  }).then( function(shop){
    if(shop) {
      tmp_shopID = shop.shopID;
      //shopPhotoDir = './data/images/shop/' + tmp_shopID + '/';
      return res.status(200).json({
        message: 'shop of this user are found',
        list: shop,
        error: 0
      });
    }else{
      console.log('empty shop !')
      return res.status(200).json({
        message: 'empty shop !',
        error: 1
      });
    }
  });
});

router.get('/shopPhotos/:shopID', function(req, res){
  var dir = shopPhotoDir + req.params.shopID + '/';
  if (fs.existsSync(dir)){
    fs.readdir(dir, (err, files) => {
      res.status(200).json({
        error: err,
        photos: files
      });
    });
  }
});

router.post('/editPhotos', function(req, res){
  var dir = shopPhotoDir + tmp_shopID + '/';
  console.log(dir)
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(dir + file, err => {
        if (err) throw err;
      });
    }
  });
  upload(req,res,function(err) {
    if(err) {
      return res.end(err+ " Error uploading file.");
    }
    var photos = [];
    req.files.forEach(file => photos.push(file.filename));
    console.log(photos);
    return res.status(200).json({
      message: 'Photos has been updated',
      error: 0,
      photos: photos
    })
  });
});

router.get('/find/:keyword', function(req, res) {
  models.Shop.findOne({
   where: { $or: [{shopID: req.params.keyword},{shop_name: req.params.keyword}]},
   include: [{
    model: models.Admin,
    //as: 'more_info',
    attributes: ['ad_tel','ad_email']
    //where: {adminID: models.Shop.adminID}
  },{
    model: models.Province,
    attributes: ['provinceID','province_name']
  },{
    model: models.Country,
    attributes: ['countryID','country_name']
  },{
    model: models.Status,
    attributes: ['statusID','status_title']
  },{
    model: models.Service,
    attributes: ['serviceID','service_title']
  }]
}).then( function(shop){
  if(shop) {
    return res.status(200).json({
      message: 'Shop is found',
      shop: shop,
      error: 0
    });
  }else{
    console.log('not found !')
    return res.status(200).json({
      message: 'not found !',
      error: 1
    });
  }
});
});

module.exports = router;