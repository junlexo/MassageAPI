"use strict";

module.exports = function(sequelize, DataTypes) {
  var Shop = sequelize.define("Shop", {
    shopID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    shop_name: {
      type: DataTypes.STRING,
      required: true,
      unique: true, 
      allowNull: false
    },
    shop_addr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provinceID:{
      type: DataTypes.UUID,
      allowNull: false
    },
    countryID:{
      type: DataTypes.UUID,
      allowNull: false
    },
    statusID: {
      type: DataTypes.UUID
    },
    shop_website:{
      type: DataTypes.STRING
    },
    shop_photo:{
      type: DataTypes.STRING
    },
    shop_desc:{
      type: DataTypes.STRING,
    },
    serviceID:{
      type: DataTypes.UUID,
      allowNull: false
    },
    adminID:{
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
      classMethods: { 
        associate: function(models) {
          Shop.hasMany(models.EmployeeGroup, {foreignKey: 'id', sourceKey: 'id', onDelete: 'CASCADE'});
        }
      }         
    /*,
	map_location: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }*/
  });

  return Shop;
};
