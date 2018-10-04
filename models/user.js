"use strict";

// using Bcrypt to hash password
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    us_username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    us_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    us_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    us_tel: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    us_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    }
  },
  {
      /*instanceMethods: {
        passCheck: function() {
          return this.password;
        },
      },*/
      hooks: {
        beforeCreate: function(user, options) {
          var hash = bcrypt.hashSync(user.us_password, salt);
          user.us_password = hash;
        }
      }
    }
    );
  return User;
};
