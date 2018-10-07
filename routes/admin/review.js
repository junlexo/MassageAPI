var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Find all reviews of Shop
router.get('/getListReviewByShopId', function(req, res) {
	models.Review.findAll({ 
		where: {
			shop_id: req.body.shop_id,
		} 
	}).then( function(allReviewByShop){
		if(allReviewByShop) {
			return res.status(200).json({
			list: allReviewByShop
			});
		}else{
			console.log('No review for this shop!')
			return res.status(200).json({
			message: 'No review for this shop!'
			});
		}
	});
});

//Find all reviews of User
router.get('/getListReviewByUserId', function(req, res) {
	models.Review.findAll({ 
		where: {
			user_id: req.body.user_id,
		} 
	}).then( function(allReviewByUserId){
		if(allReviewByUserId) {
			return res.status(200).json({
			list: allReviewByUserId
			});
		}else{
			console.log('No review of this user stored!')
			return res.status(200).json({
			message: 'No review of this user stored!'
			});
		}
	});
});

//Find all reviews of User for Shop
router.get('/getListByShopAndUserId', function(req, res) {
	models.Review.findAll({ 
		where: {
			shop_id: req.body.shop_id,
			user_id: req.body.user_id,
		} 
	}).then( function(allReviewByShopAndUserId){
		if(allReviewByShopAndUserId) {
			return res.status(200).json({
			list: allReviewByShopAndUserId
			});
		}else{
			console.log('No review of this user for shop stored!')
			return res.status(200).json({
			message: 'No review of this user for shop stored!'
			});
		}
	});
});

//Find all reviews for management
router.get('/getAllReview', function(req, res) {
	models.Review.findAll().then( function(allReview){
		if(allReview) {
			return res.status(200).json({
			list: allReview
			});
		}else{
			console.log('No review stored!')
			return res.status(200).json({
			message: 'No review stored!'
			});
		}
	});
});

//Find a review by reviewId
router.get('/getReviewById', function(req, res) {
	models.Review.findAll({ 
		where: {
			id: req.body.id,
		} 
	}).then( function(reviewInfo){
		if(reviewInfo) {
			return res.status(200).json({
			result: reviewInfo
			});
		}else{
			console.log('No review stored!')
			return res.status(200).json({
			message: 'No review stored!'
			});
		}
	});
});

//Add a review
router.post('/addReview', function(req, res) { 
	models.Shop.findOne({ 
		where: {
			id: req.body.shop_id,
    	} 
  	}).then(function(retObjCheck) {   
    	if(retObjCheck){ 
			console.log('Shop already exist');                
			models.Review.create({
				user_id: req.body.user_id,
				shop_id: req.body.shop_id,
				disp_name: req.body.disp_name,
				point: req.body.point,
				description: req.body.description,
				status: req.body.status,
			}).then( function(retObjAdd){
				if(retObjAdd) {
					return res.status(200).json({
						message: 'Review added',
						error: 0, //TODO: define error code
						result: retObjAdd
					});
				}else{
					return res.status(200).json({
						message: 'Error: Can not add a review!',
						error: 1, //TODO: define error code
					});
				}
			});
		}else{
			return res.status(400).json({
				message: 'Shop not already exist',                
				error: 1, //TODO: define error code                
			}); 
		}
	});
});

//Edit a review
router.post('/editReview', function(req, res) { 
	models.Review.findOne({ 
		where: {
			id: req.body.id , //Review Id
    	} 
  	}).then(function(retObjCheck) {   
    	if(retObjCheck){                        
				models.Review.update({  //Edit info
					point: req.body.point,
					description: req.body.description,
				}).then( function(retObjEdit){
				  if(retObjEdit) {
				    return res.status(200).json({
						message: 'Review edited!',
						error: 0, //TODO: define error code  
						result: retObjEdit
				    });
				  }else{
				  	return res.status(200).json({
						message: 'Can not edit a Review!',
						error: 1, //TODO: define error code  
				    });	
				  }
				});  
		}else{
			  return res.status(200).json({
		        message: 'A Review not already exist!',                
		        error: 1, //TODO: define error code                  
		    }); 
		}
    })
});

//Delete a review (Set status of review = 2)
router.post('/deleteReview', function(req, res) {
	models.Review.findOne({ 
		where: {
			id: req.body.id , //Review Id
    	} 
  	}).then(function(retObjCheck) {   
    	if(retObjCheck){                        
				models.Review.update({  //Edit info
					status: 2 //Update status => deleted
				}).then( function(retObjEdit){
				  if(retObjEdit) {
				    return res.status(200).json({
						message: 'Review edited!',
						error: 0, //TODO: define error code  
						result: retObjEdit
				    });
				  }else{
				  	return res.status(200).json({
						message: 'Can not edit a Review!',
						error: 1, //TODO: define error code  
				    });	
				  }
				});  
		}else{
			  return res.status(200).json({
		        message: 'A Review not already exist!',                
		        error: 1, //TODO: define error code                  
		    }); 
		}
    })
});

module.exports = router;