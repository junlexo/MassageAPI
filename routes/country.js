var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/getList', function(req, res){
	models.Country.all({attribute:['countryID','country_name']}).then( countries =>{
		let response;
		if(countries){
			response = {
				message: 'countries Found',        
        		countries: countries,
        		error: 0
			}
		}else{
			response = {
				message: 'countries not Found',        
        		countries: countries,
        		error: 1
			}
		}
		return res.status(200).json(response);
	});
});

router.get('/getAll', function(req, res){
	models.Country.all({
		attributes: ['countryID','country_name'],
		include: [{
			model: models.Province,
			attributes:['provinceID','province_name']
			}]
		}).then( countries => {
		let response;
		if(countries){
			response = {
				message: 'countries Found',        
        		countries: countries,
        		error: 0
			}
		}else{
			response = {
				message: 'countries not Found',        
        		countries: countries,
        		error: 1
			}
		}
		return res.status(200).json(response);
	});
});

router.post('/addList', function(req, res){
	var countries = req.body;
	countries.forEach( country => {
		models.Country.findOrCreate({ where: {country_name: country.country_name}}).spread((country,created) => {
			return res.status(200).json({
				country: country.get({ plain: true}),
				error: !created
			});
		});
	});
});

module.exports = router;