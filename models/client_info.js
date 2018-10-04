"use strict";

module.exports = function(sequelize, DataTypes) {
	var Client = sequelize.define("Client",{
		clientID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		client_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		client_age: {
			type: DataTypes.INTEGER
			// allowNull: false,
			// validate: {
   //      		notEmpty: true
   //    		}
		},
		client_tel: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		client_email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		client_addr: {
			type: DataTypes.STRING
		},
		client_comm: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		userID: {
			type: DataTypes.UUID
		}
	});
	return Client;
};