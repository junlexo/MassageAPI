"use strict";

module.exports = function(sequelize, DataTypes) {
  var Shop_information = sequelize.define("Shop_information", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    shop_name: {
      type: DataTypes.STRING,
      required: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service_type: {
      type: DataTypes.ENUM,
      values: ['massage&spa', 'foot_massage', 'body_massage'],
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   notEmpty: true
      // }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   notEmpty: true
      // }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   notEmpty: true
      // }
    },
    detail_direction: {
      type: DataTypes.STRING
    },    
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    website: {
      type: DataTypes.STRING,
      //allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    },
    brief_information: {
      type: DataTypes.STRING
      // allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    } /*,
	map_location: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }*/
  }
  );

  return Shop_information;
};
