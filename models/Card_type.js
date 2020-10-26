'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Card_type hasMany Cards
      Card_type.hasMany(models.Card, {
        foreignKey: 'type_id',
        as: 'cards'
      });

    }
  };
  Card_type.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    is_enabled: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Card_type',
  });
  return Card_type;
};