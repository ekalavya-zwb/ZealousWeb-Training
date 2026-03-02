"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("departments", [
      {
        dept_name: "Engineering",
        location: "New York",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        dept_name: "Marketing",
        location: "Los Angeles",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        dept_name: "Sales",
        location: "Chicago",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        dept_name: "HR",
        location: "New Jersey",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
