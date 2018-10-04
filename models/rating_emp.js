"use strict";

module.exports = function(sequelize, DataTypes) {
	var Remp = sequelize.define("Remp",{
		rempID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		remp_starnum: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		remp_comm: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		empID: {
			type: DataTypes.UUID,
			allowNull: false
		}
	});
	return Remp;
};