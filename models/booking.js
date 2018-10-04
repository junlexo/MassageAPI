"use strict";

module.exports = function(sequelize, DataTypes) {
	var Booking = sequelize.define("Booking",{
		bkID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		clientID: {
			type: DataTypes.UUID,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		bk_checkin: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		bk_checkout: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		statusID: {
			type: DataTypes.UUID
		},
		bk_totalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		roomID: {
			type: DataTypes.UUID,
			allowNull: false
		},
		nvcsID: {
			type: DataTypes.UUID,
			allowNull: false
		},
		shopID: {
			type: DataTypes.UUID,
			allowNull: false
		}
	});
	return Booking;
};