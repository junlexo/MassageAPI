"use strict";

module.exports = function(sequelize, DataTypes) {
  var service = sequelize.define("Service", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    shop_id: {
      type: DataTypes.UUID
    },
    type: {
      type: DataTypes.ENUM,
      values: ['massage yoni', 'vat ly tri lieu', 'toan than', 'massage sauna']
    },
    price: {
      type: DataTypes.INTEGER
    }
  });

  return service;
};
