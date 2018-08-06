"use strict";

// using Bcrypt to hash password
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
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
          var hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        }
      }
    }
  );

  return User;
};
