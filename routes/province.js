var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/getList/:id', function(req, res){
	models.Province.all({
		where: {countryID: req.params.id },
		attributes: ['provinceID','province_name']
	}).then( province =>{
		let response;
		if(province){
			response = {
				message: 'province Found',        
        		provinces: province,
        		error: 0
			}
		}else{
			response = {
				message: 'countries not Found',        
        		provinces: province,
        		error: 1
			}
		}
		return res.status(200).json(response);
	});
});


router.post('/addList', function(req, res){
	var provinces = req.body;
	provinces.forEach( province => {
		models.Province.findOrCreate({
		 where: { $and:[{province_name: province.province_name}, {countryID: province.countryID}]} ,
		  defaults: {province_name: province.province_name , countryID: province.countryID}}).spread((province,created) => {
			console.log({
				province: province.get({ plain: true}),
				error: !created
			});
		});
	});
	return res.status(200).json({message: 'add province successfully'});
});
module.exports = router;
