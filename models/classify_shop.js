"use strict";

module.exports = function(sequelize, DataTypes) {
  var classify = sequelize.define("classify", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    activity: {
      type: DataTypes.INTEGER
    },
    convenience: {
      type: DataTypes.INTEGER
    },
    fit_with: {
      type: DataTypes.INTEGER
    },
    special_service: {
      type: DataTypes.INTEGER
    }
  }
  );

  return classify;
};
