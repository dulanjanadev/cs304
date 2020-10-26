'use strict';

/**
 * migration that performs two changes in the database, using an automatically-managed transaction to ensure that 
   all instructions are successfully executed or rolled back in case of failure:
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /*
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.addColumn('Person', 'petName', {
            type: Sequelize.DataTypes.STRING
          }, { transaction: t }),
          queryInterface.addColumn('Person', 'favoriteColor', {
            type: Sequelize.DataTypes.STRING,
          }, { transaction: t })
        ]);
      });
    */

    await ([
      queryInterface.addColumn('distributions', 'no_of_cards_sent', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('distributions', 'no_of_cards_returned', {
        type: Sequelize.INTEGER
      })
    ]);


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /**
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.removeColumn('Person', 'petName', { transaction: t }),
          queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })
        ]);
      });
    */

    await ([
      queryInterface.removeColumn('distributions', 'no_of_cards_sent'),
      queryInterface.removeColumn('distributions', 'no_of_cards_returned'),
    ]);

  }
};
