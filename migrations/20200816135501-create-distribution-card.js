'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('distribution_cards', {
      distribution_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'distributions',
          key: 'id',
          as: 'distribution_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      card_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'cards',
          key: 'id',
          as: 'card_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      reading: {
        type: Sequelize.DOUBLE
      },
      dose: {
        type: Sequelize.DOUBLE
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('distribution_cards');
  }
};