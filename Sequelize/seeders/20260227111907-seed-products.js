"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        product_name: "Laptop Pro 15",
        sku: "SKU-LAP-001",
        price: 1499.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "Wireless Mouse",
        sku: "SKU-MOU-002",
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "Mechanical Keyboard",
        sku: "SKU-KEY-003",
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "27-inch Monitor",
        sku: "SKU-MON-004",
        price: 329.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "USB-C Docking Station",
        sku: "SKU-DOC-005",
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
