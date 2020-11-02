'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Employee belongsTo a Role
      Employee.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Employee belongsTo a Status
      Employee.belongsTo(models.Role, {
        foreignKey: 'status_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Employee belongsTo an Institute
      Employee.belongsTo(models.Institute, {
        foreignKey: 'institute_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Head belongsTo an Institute
      // Employee.hasOne(models.Institute, {
      //   foreignKey: 'head_ref_no',
      //   as: 'head'
      // });

      // ICP belongsTo an Institute
      // Employee.hasOne(models.Institute, {
      //   foreignKey: 'icp_ref_no',
      //   as: 'icp'
      // });

      // RPO belongsTo an Institute
      // Employee.hasOne(models.Institute, {
      //   foreignKey: 'rpo_ref_no',
      //   as: 'rpo'
      // });

      // Employee hasMany Cards
      Employee.hasMany(models.Card, {
        foreignKey: 'emp_ref_no',
        as: 'cards'
      });
    }
  };
  Employee.init({
    ref_no: {
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
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    emp_start_date: DataTypes.DATE,
    emp_end_date: DataTypes.STRING,
    is_enabled: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};