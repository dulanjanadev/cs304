'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      type_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'card_types',
          key: 'id',
          as: 'type_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      status_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'statuses',
          key: 'id',
          as: 'status_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      is_background: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      purchased_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      emp_ref_no: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'employees',
          key: 'ref_no',
          as: 'emp_ref_no'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('cards');
  }
};