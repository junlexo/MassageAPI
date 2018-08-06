"use strict";

module.exports = function(sequelize, DataTypes) {
  var Other_information = sequelize.define("Other_information", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    volume: {
      type: DataTypes.INTEGER
    },
    open_hour: {
      type: DataTypes.INTEGER
    },
    open_minute: {
      type: DataTypes.INTEGER
    },
    close_hour: {
      type: DataTypes.INTEGER
    },
    open_minute: {
      type: DataTypes.INTEGER
    },
    last_receive_hour: {
      type: DataTypes.INTEGER
    },
    last_receive_minute: {
      type: DataTypes.INTEGER
    },
    min_price: {
      type: DataTypes.INTEGER
    },
    max_price: {
      type: DataTypes.INTEGER
    },
    language: {
      type: DataTypes.STRING
      // allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    }
  }
  );

  return Other_information;
};
