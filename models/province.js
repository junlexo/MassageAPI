"use strict";

module.exports = function(sequelize, DataTypes) {
	var Province = sequelize.define("Province",{
		provinceID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		province_name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		countryID: {
			type: DataTypes.UUID,
			allowNull: false
		}
	});
	return Province;
};