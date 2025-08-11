'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Trips', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Trips', 'deletedAt');
  }
};