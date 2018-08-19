var models  = require('../../models');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');


// Add one service API
router.post('/add', function(req, res){
  models.Service.findOne({ 
    where: {
      name: req.body.name
    }
  }).then(function(service){
    if(service) {
        if(service.name === req.body.name) {
          console.log('Service name already exist');
          return res.status(200).json({
                  message: 'Service name already exist',
                  error: 1
                });
        }
      }
      models.Service.create({
      name: req.body.name,
      type: req.body.type,
      shop_id: req.body.shop_id,
      price: req.body.price
    }).then( function(newserv){
      if(newserv) {
        return res.status(200).json({
          message: 'Service add',
          result: newserv
        });
      }
    });
  });
});


// Update one service API
router.post('/update', function(req, res){
  models.Service.findOne({ 
    where: { 
      name: req.body.name 
    } 
  }).then(function (service){
    // Check if record exists in db
    if (service) {
      service.update({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price
      })
      .then(function (resp){
        if(resp)
          return res.status(200).json({
            message: 'Service update',
            error: 0,
            result: resp
          });
        });
    }
    else {
      return res.status(200).json({
        message: 'Service not exist',
        error: 1
      });
    }
  }); 
});


// Delete one service API
router.delete('/delete/:id', function(req, res, next){
  models.Service.destroy({
    where : {
      id: req.params.id
    }
  }).then(function (resp){
    console.log('delete by id');
    if(resp)
      return res.status(200).json({
        message: 'Service remove',
        error: 0
      });
    else
      return res.status(200).json({
        message: 'Service not exist',
        error: 1
      });
  });
});


// List all services
router.get('/listAll', function(req, res, next){
  models.Service.findAll().then(function(service){
    if(service.length) {
      return res.status(200).json({
        message: 'Service found',
        error: 0,
        result: service
      });
    }
    else {
      return res.status(200).json({
        message: 'Service not found',
        error: 1
      });
    }
  });
});


// View one service by id
router.get('/view/:id', function(req, res){
  models.Service.findOne({
    where : {
      id: req.params.id
    }
  }).then(function(service){
    if(service.id === req.params.id) {
      return res.status(200).json({
        message: 'Service found',
        error: 0,
        result: service
      });
    }
    else {
      return res.status(200).json({
        message: 'Service not found',
        error: 1,
      });
    }
  });
});


module.exports = router;
	