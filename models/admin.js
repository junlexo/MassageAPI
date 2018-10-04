"use strict";
// using Bcrypt to hash password
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = function(sequelize, Datatypes){
	var Admin = sequelize.define("Admin",{
		adminID: {
			type: Datatypes.UUID,
			primaryKey: true,
			defaultValue: Datatypes.UUIDV4
		},
		ad_username: {
			type: Datatypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
        		notEmpty: true
      		}
		},
		ad_password: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		ad_tel: {
			type: Datatypes.STRING(30),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		ad_email: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true,
        		isEmail: true
      		}	
		},
		ad_role: {
			type: Datatypes.ENUM,
			values: ['limited', 'super'],
			defaultValue: 'limited'
		}
	},
	{
		hooks: {
        beforeCreate: function(admin, options) {
          var hash = bcrypt.hashSync(admin.ad_password, salt);
          admin.ad_password = hash;
        }
      }
	});
	return Admin;
};