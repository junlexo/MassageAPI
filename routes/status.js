var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/getAll', function(req, res){
	models.Country.all({
		attributes: ['statusID','status_title']
		}).then( status => {
		let response;
		if(status){
			response = {
				message: 'status Found',        
        		status: status,
        		error: 0
			}
		}else{
			response = {
				message: 'status not Found',        
        		status: status,
        		error: 1
			}
		}
		return res.status(200).json(response);
	});
});

router.post('/addList', function(req, res){
	var status = req.body;
	status.forEach( status => {
		models.Status.findOrCreate({ where: {status_title: status.status_title}}).spread((status,created) => {
			return res.status(200).json({
				status: status.get({ plain: true}),
				error: !created
			});
		});
	});
});

module.exports = router;