  "use strict";

module.exports = function(sequelize, DataTypes) {
  var EmployeeGroup = sequelize.define("EmployeeGroup", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4     
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
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  },
    {
      classMethods: {
        associate: function(models) {
          EmployeeGroup.belongsTo(models.Shop, {foreignKey: 'id', targetKey: 'user_id'});
        }
      }     
    }
  );
  return EmployeeGroup;
};
