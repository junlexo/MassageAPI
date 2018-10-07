"use strict";

module.exports = function(sequelize, DataTypes) {
	var Employee  = sequelize.define("Emp",{
		empID: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		emp_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		},
		emp_birthday: {
			type: DataTypes.STRING(50)
		},
		emp_intro: {
			type: DataTypes.STRING,
		},
		emp_photo: {
			type: DataTypes.STRING,
			allowNull: false
		},
		emp_price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		shopID: {
			type: DataTypes.UUID,
			allowNull: false,
			validate: {
        		notEmpty: true
      		}
		}
	});
	return Employee;
};