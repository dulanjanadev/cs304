'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Role hasMany Users
      Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
      });

      // Role hasMany Employees
      Role.hasMany(models.Employee, {
        foreignKey: 'role_id',
        as: 'employees'
      });

    }
  };
  Role.init({
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
    modelName: 'Role',
  });
  return Role;
};