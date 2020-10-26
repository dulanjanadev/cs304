'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Distribution belongsTo an Institute
      Distribution.belongsTo(models.Institute, {
        foreignKey: 'institute_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution belongsTo a Prepared user
      Distribution.belongsTo(models.User, {
        foreignKey: 'prepared_by',
        onUpdate : 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution belongsTo a Received user
      Distribution.belongsTo(models.User, {
        foreignKey: 'received_by',
        onUpdate : 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution belongsTo a Read user
      Distribution.belongsTo(models.User, {
        foreignKey: 'read_by',
        onUpdate : 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution belongsTo a Processed user
      Distribution.belongsTo(models.User, {
        foreignKey: 'processed_by',
        onUpdate : 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution belongsTo a Status
      Distribution.belongsTo(models.Status, {
        foreignKey: 'status_id',
        onUpdate : 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Distribution hasOne Report
      Distribution.hasOne(models.Report, {
        foreignKey: 'distribution_id',
        as: 'reports'
      });

      // Distribution hasMany Cards
      Distribution.belongsToMany(models.Card, {
        through: 'distribution_cards'
      });
    }
  };
  Distribution.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    send_date: DataTypes.DATE,
    received_date: DataTypes.DATE,
    distribution_period: DataTypes.STRING,
    exposure_start_date: DataTypes.DATE,
    exposure_end_date: DataTypes.DATE,
    prepared_date: DataTypes.DATE,
    received_date: DataTypes.DATE,
    read_date: DataTypes.DATE,
    processed_date: DataTypes.DATE,
    background_dose: DataTypes.DOUBLE,
    method_used: DataTypes.STRING,
    remarks: DataTypes.STRING,
    is_enabled: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    
  }, {
    sequelize,
    modelName: 'Distribution',
  });
  return Distribution;
};