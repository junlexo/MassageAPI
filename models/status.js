"use strict";

module.exports = function(sequelize, DataTypes) {
	var Status  = sequelize.define("Status",{
		statusID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4			
		},
		status_title: {
			type: DataTypes.ENUM,
			values: ['processing','approved','canceled']
			// defaultValue: 'processing'
		}
	});
	return Status;
}