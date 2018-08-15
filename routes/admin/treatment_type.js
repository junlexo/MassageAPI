var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/add', function(req, res) {  
  models.TreatmentType.findOne({ where: {
      [Op.or]: [
        { code: req.body.code },
        { name: req.body.name }
      ] 
    } 
  }).then(function(treatType) {   
    if(treatType)
    { 
      if(treatType.code === req.body.code) {            
        console.log('TreatmentType Code already exist');      
        return res.status(200).json({
                message: 'TreatmentType Code already exist',                
                error: 1                
            });    
      }
      else
      {
        console.log('TreatmentType Name already exist');      
        return res.status(200).json({
                message: 'TreatmentType Name already exist',                
                error: 2                
            });  
      }
    }        
    models.TreatmentType.create({
      name: req.body.name,
      code: req.body.code
    }).then( function(treatTypeNew){
      if(treatTypeNew) {
        return res.status(200).json({
          message: 'TreatmentType added',
          error: 0,
          result: treatTypeNew
        });
      }
    });
  });  
});

router.post('/update', function(req, res) {  
  var decode = jwt.decode(req.query.token); 
  models.TreatmentType.findOne({ where: { code: req.body.code } })
  .then(function (treatType) {
    // Check if record exists in db  
    if (treatType) {        
        treatType.update({
          name: req.body.name          
        })
        .then(function (resp) {
          if(resp)
            return res.status(200).json({
              message: 'User Updated',
              error: 0,
              results: resp
            });
        })      
    }
    else
    {
    	return res.status(200).json({
          message: 'TreatmentType not exist',
          error: 1
        });
    }
  }); 
});

router.delete('/delete/:id', function(req, res, next){
  models.TreatmentType.destroy({where : {id: req.params.id}}).then(function (resp) {       
        if(resp)
          return res.status(200).json({            
            message: 'TreatmentType Removed',        
            error: 0
          });
        else
          return res.status(200).json({
            message: 'TreatmentType not exist',
          	error: 1        
          });
      });
});

router.get('/listAll', function(req, res, next){
  models.TreatmentType.findAll().then(function(treatType) {
    if(treatType.length) {
      return res.status(200).json({
        message: 'TreatmentType Found',
		error: 0,        
        results: treatType
      });
    }
    else {
    	return res.status(200).json({
	        message: 'TreatmentType Not Found',
			error: 1	       
	      });
    }
  });
});

router.get('/view/:id', function(req, res, next){
  models.TreatmentType.findOne({where: {id: req.params.id}}).then(function(treatType) {
    if(treatType) {
      return res.status(200).json({
        message: 'TreatmentType Found',
        error: 0,
        results: treatType
      });
    }
    else
    {
    	return res.status(200).json({
        message: 'TreatmentType Not Found',
		error: 1        
      });
    }
  });
});
module.exports = router;