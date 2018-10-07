"use strict";

module.exports = function(sequelize, DataTypes) {
	var Room = sequelize.define("Room",{
		roomID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		room_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		room_price: {
			type: DataTypes.FLOAT,
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
	return Room;
};