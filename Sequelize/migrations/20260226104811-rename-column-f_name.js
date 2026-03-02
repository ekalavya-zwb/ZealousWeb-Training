"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("employees", "first_name", "f_name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("employees", "f_name", "first_name");
  },
};
