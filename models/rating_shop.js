"use strict";

module.exports = function(sequelize, DataTypes) {
	var Rs = sequelize.define("Rs",{
		rsID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		rs_starnum: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		rs_comm: {
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
	return Rs;
};