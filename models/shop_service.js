"use strict";

module.exports = function(sequelize, DataTypes){
	var Service = sequelize.define("Service",{
		serviceID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		service_title: {
			type: DataTypes.STRING(50),
			allowNull: false
		}
	});
	return Service;
};