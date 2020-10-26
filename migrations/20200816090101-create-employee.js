'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employees', {
      ref_no: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      name_with_initials: {
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
      role_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'roles',
          key: 'id',
          as: 'role_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      nic: {
        type: Sequelize.STRING
      },
      contact_no: {
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      emp_start_date: {
        type: Sequelize.DATE
      },
      emp_end_date: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('employees');
  }
};