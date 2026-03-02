"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("employees", ["email"], {
      unique: true,
      name: "unique_employee_email",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("employees", "unique_employee_email");
  },
};
