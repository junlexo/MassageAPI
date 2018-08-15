"use strict";

module.exports = function(sequelize, DataTypes) {
  var TreatmentType = sequelize.define("TreatmentType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true        
      }
    }
  },
    {
      /*instanceMethods: {
        passCheck: function() {
          return this.password;
        },
      },*/      
    }
  );

  return TreatmentType;
};
