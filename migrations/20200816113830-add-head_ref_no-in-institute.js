'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('institutes', 'head_ref_no', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'ref_no',
        as: 'head_ref_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('institutes', 'head_ref_no');
  
  }
};
