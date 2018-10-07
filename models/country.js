"use strict";

module.exports = function(sequelize, DataTypes) {
	var Country = sequelize.define("Country",{
		countryID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		country_name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		}
	});
	return Country;
};