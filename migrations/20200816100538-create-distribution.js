'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('distributions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      send_date: {
        type: Sequelize.DATE
      },
      received_date: {
        type: Sequelize.DATE
      },
      distribution_period: {
        type: Sequelize.STRING
      },
      exposure_start_date: {
        type: Sequelize.DATE
      },
      exposure_end_date: {
        type: Sequelize.DATE
      },
      prepared_by: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
          as: 'prepared_by'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      prepared_date: {
        type: Sequelize.DATE
      },
      received_by: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
          as: 'received_by'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      received_date: {
        type: Sequelize.DATE
      },
      read_by: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
          as: 'read_by'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      read_date: {
        type: Sequelize.DATE
      },
      processed_by: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
          as: 'processed_by'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      processed_date: {
        type: Sequelize.DATE
      },
      background_dose: {
        type: Sequelize.DOUBLE
      },
      method_used: Sequelize.STRING,
      remarks: {
        type: Sequelize.STRING
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('distributions');
  }
};