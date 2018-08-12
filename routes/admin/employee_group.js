var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/add', function(req, res) {  
  models.EmployeeGroup.findOne({ where: {
      [Op.or]: [
        { code: req.body.code },
        { name: req.body.name }
      ] 
    } 
  }).then(function(groupEmp) {   
    if(groupEmp)
    { 
      if(groupEmp.code === req.body.code) {            
        console.log('EmployeeGroup Code already exist');      
        return res.status(200).json({
                message: 'EmployeeGroup Code already exist',                
                error: 1                
            });    
      }
      else
      {
        console.log('EmployeeGroup Name already exist');      
        return res.status(200).json({
                message: 'EmployeeGroup Name already exist',                
                error: 2                
            });  
      }
    }        
    models.EmployeeGroup.create({
      name: req.body.name,
      code: req.body.code
    }).then( function(groupEmpNew){
      if(groupEmpNew) {
        return res.status(200).json({
          message: 'EmployeeGroup added',
          error: 0,
          result: groupEmpNew
        });
      }
    });
  });  
});

router.post('/update', function(req, res) {  
  var decode = jwt.decode(req.query.token); 
  models.EmployeeGroup.findOne({ where: { code: req.body.code } })
  .then(function (groupEmp) {
    // Check if record exists in db  
    if (groupEmp) {        
        groupEmp.update({
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
          message: 'EmployeeGroup not exist',
          error: 1
        });
    }
  }); 
});

router.delete('/delete/:id', function(req, res, next){
  models.EmployeeGroup.destroy({where : {id: req.params.id}}).then(function (resp) {       
        if(resp)
          return res.status(200).json({            
            message: 'EmployeeGroup Removed',        
            error: 0
          });
        else
          return res.status(200).json({
            message: 'EmployeeGroup not exist',
          	error: 1        
          });
      });
});

router.get('/listAll', function(req, res, next){
  models.EmployeeGroup.findAll().then(function(groupEmp) {
    if(groupEmp.length) {
      return res.status(200).json({
        message: 'EmployeeGroup Found',
		error: 0,        
        results: groupEmp
      });
    }
    else {
    	return res.status(200).json({
	        message: 'EmployeeGroup Not Found',
			error: 1	       
	      });
    }
  });
});

router.get('/view/:id', function(req, res, next){
  models.EmployeeGroup.findOne({where: {id: req.params.id}}).then(function(groupEmp) {
    if(groupEmp) {
      return res.status(200).json({
        message: 'EmployeeGroup Found',
        error: 0,
        results: groupEmp
      });
    }
    else
    {
    	return res.status(200).json({
        message: 'EmployeeGroup Not Found',
		error: 1        
      });
    }
  });
});
module.exports = router;