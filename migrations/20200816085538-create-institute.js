'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('institutes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      ad_line_1: {
        type: Sequelize.STRING
      },
      ad_line_2: {
        type: Sequelize.STRING
      },
      ad_line_3: {
        type: Sequelize.STRING
      },
      ad_line_4: {
        type: Sequelize.STRING
      },
      inv_ad_line_1: {
        type: Sequelize.STRING
      },
      inv_ad_line_2: {
        type: Sequelize.STRING
      },
      inv_ad_line_3: {
        type: Sequelize.STRING
      },
      inv_ad_line_4: {
        type: Sequelize.STRING
      },
      distribution_frequency: {
        type: Sequelize.STRING
      },
      is_enabled: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('institutes');
  }
};