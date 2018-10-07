"use strict";

module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    shop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    disp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 5,
      min: 0,
      defaultValue: 1,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: { //0-Pending, 1-Active, 2-Deleted
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 2,
      min: 0,
      defaultValue: 0,
    },      
  });

  return Review;
};
