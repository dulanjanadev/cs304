'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Status hasMany Users
      Status.hasMany(models.User, {
        foreignKey: 'status_id',
        as: 'users'
      });

      // Status hasMany Employees
      Status.hasMany(models.Employee, {
        foreignKey: 'status_id',
        as: 'employees'
      });

      // Status hasMany Cards
      Status.hasMany(models.Card, {
        foreignKey: 'status_id',
        as: 'cards'
      });

      // Status hasMany Distributions
      Status.hasMany(models.Distribution, {
        foreignKey: 'status_id',
        as: 'distributions'
      })

    }
  };
  Status.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    is_enabled: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};