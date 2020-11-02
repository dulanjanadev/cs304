'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Report belongsTo a Distribution
      Report.belongsTo(models.Distribution, {
        foreignKey: 'distribution_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Report belongsTo a Institute
      Report.belongsTo(models.Institute, {
        foreignKey: 'institute_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Report belongsTo a Prepared user
      Report.belongsTo(models.User, {
        foreignKey: 'prepared_by',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

    }
  };
  Report.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    prepared_date: DataTypes.DATE,
    is_enabled: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};