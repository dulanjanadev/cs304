'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      distribution_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'distributions',
          key: 'id',
          as: 'distribution_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      institute_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'institutes',
          key: 'id',
          as: 'institute_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      prepared_by: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
          as: 'prepared_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      prepared_date: {
        type: Sequelize.DATE
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('reports');
  }
};