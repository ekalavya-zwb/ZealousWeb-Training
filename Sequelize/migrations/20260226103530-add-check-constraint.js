"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("employees", {
      fields: ["salary"],
      type: "check",
      name: "check_salary_positive",
      where: { salary: { [Op.gt]: 0 } },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("employees", "check_salary_positive");
  },
};
