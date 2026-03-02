"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("employees", ["dept_id", "salary"], {
      name: "idx_dept_salary",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("employees", "idx_dept_salary");
  },
};
