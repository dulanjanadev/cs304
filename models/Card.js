'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Card belongsTo a Card_type
      Card.belongsTo(models.Card_type, {
        foreignKey: 'type_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Card belongsTo Status
      Card.belongsTo(models.Status, {
        foreignKey: 'status_id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Card belongsTo an Employee
      Card.belongsTo(models.Employee, {
        foreignKey: 'emp_ref_no',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Cards belongsToMany Distributions
      Card.belongsToMany(models.Distribution, {
        through: 'distribution_cards'
      }); 

    }
  };
  Card.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    is_background: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    purchased_date: DataTypes.DATE,
    description: DataTypes.STRING,
    is_enabled: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};