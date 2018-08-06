"use strict";

module.exports = function(sequelize, DataTypes) {
  var Shop_information = sequelize.define("Shop_information", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shop_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   notEmpty: true
      // }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    },
    service_type: {
      type: DataTypes.INTEGER,
      // validate: {
      //   notEmpty: true
      // }
    },
    province: {
      type: DataTypes.INTEGER,
      // validate: {
      //   notEmpty: true
      // }
    },
    district: {
      type: DataTypes.INTEGER,
      // validate: {
      //   notEmpty: true
      // }
    },
    zone: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    },
    detail_direction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },    
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    brief_information: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
