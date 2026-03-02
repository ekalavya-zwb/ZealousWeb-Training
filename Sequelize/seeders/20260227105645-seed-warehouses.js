"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("warehouses", [
      {
        warehouse_name: "Central Warehouse",
        location: "New York",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_name: "West Coast Hub",
        location: "Los Angeles",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_name: "Midwest Depot",
        location: "Chicago",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("warehouses", null, {});
  },
};
