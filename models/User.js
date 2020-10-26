'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // User belongsTo a Role
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // User belongsTo a Status
      User.belongsTo(models.Status, {
        foreignKey: 'status_id',
        as: 'status',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Prepared user hasMany Distribution
      User.hasMany(models.Distribution, {
        foreignKey: 'prepared_by',
        as: 'prepared_distributions'
      });

      // Received user hasMany Distribution
      User.hasMany(models.Distribution, {
        foreignKey: 'received_by',
        as: 'received_distributions'
      });

      // Read user hasMany Distribution
      User.hasMany(models.Distribution, {
        foreignKey: 'read_by',
        as: 'read_distributions'
      });

      // Processed user hasMany Distribution
      User.hasMany(models.Distribution, {
        foreignKey: 'processed_by',
        as: 'processed_distributions'
      });

      // Prepared user hasMany Reports
      User.hasMany(models.Report, {
        foreignKey: 'prepared_by',
        as: 'reports'
      });

    }
  };
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    title: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    name_with_initials: DataTypes.STRING,
    nic: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    email: {
      unique: true,
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    is_enabled: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};