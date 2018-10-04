var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/getAll', function(req, res){
	models.Service.all().then( services =>{
		let response;
		if(services){
			response = {
				message: 'services Found',        
        		services: services,
        		error: 0
			}
		}else{
			response = {
				message: 'services not Found',        
        		services: services,
        		error: 1
			}
		}
		return res.status(200).json(response);
	});
});

router.post('/addList', function(req, res){
	var services = req.body;
	services.forEach( service => {
		models.Service.findOrCreate({where: {service_title: service.service_title}})
		.spread((service,created) => {
			console.log({
				service: service.service_title,
				error: !created
			});
		});	
	});
	return res.status(200).json({
		message: 'add successfully'
	});
});

module.exports = router;
