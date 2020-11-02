'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Institute hasMany Employees
      Institute.hasMany(models.Employee, {
        foreignKey: 'institute_id',
        as: 'employees'
      });

      // Institute hasOne Head
      // Institute.belongsTo(models.Employee, {
      //   foreignKey: 'head_ref_no',
      //   onUpdate: 'CASCADE',
      //   onDelete: 'RESTRICT'
      // });
      // Institute hasOne ICP
      // Institute.belongsTo(models.Employee, {
      //   foreignKey: 'icp_ref_no',
      //   onUpdate: 'CASCADE',
      //   onDelete: 'RESTRICT'
      // });

      // Institute hasOne RPO 
      // Institute.belongsTo(models.Employee, {
      //   foreignKey: 'rpo_ref_no',
      //   onUpdate: 'CASCADE',
      //   onDelete: 'RESTRICT'
      // });

      // Institute hasMany Distribution
      // Institute.hasMany(models.Distribution, {
      //   foreignKey: 'institute_id',
      //   as: 'distributions'
      // });

      // Institute hasMany Reports
      // Institute.hasMany(models.Report, {
      //   foreignKey: 'institute_id',
      //   as: 'reports'
      // });

    }
  };
  Institute.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    ad_line_1: DataTypes.STRING,
    ad_line_2: DataTypes.STRING,
    ad_line_3: DataTypes.STRING,
    ad_line_4: DataTypes.STRING,
    inv_ad_line_1: DataTypes.STRING,
    inv_ad_line_2: DataTypes.STRING,
    inv_ad_line_3: DataTypes.STRING,
    inv_ad_line_4: DataTypes.STRING,
    distribution_frequency: DataTypes.STRING,
    is_enabled: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Institute',
  });
  return Institute;
};