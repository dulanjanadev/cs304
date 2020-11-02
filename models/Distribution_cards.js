'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distribution_cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Distribution_cards.init({
    distribution_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    card_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    reading: DataTypes.DOUBLE,
    dose: DataTypes.DOUBLE,
    is_enabled: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Distribution_cards',
  });
  return Distribution_cards;
};