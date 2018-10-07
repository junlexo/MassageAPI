"use strict";

module.exports = function(sequelize, DataTypes) {
	var Discount = sequelize.define("Discount",{
		discountID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		discount_val: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		discount_staDate: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		discount_endDate: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		shopID: {
			type: DataTypes.UUID,
			allowNull: false
		}
	});
	return Discount;
};