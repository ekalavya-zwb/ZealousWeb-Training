"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("warehouse_stock", [
      {
        warehouse_id: 1,
        product_id: 1,
        quantity: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 1,
        product_id: 2,
        quantity: 185,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 1,
        product_id: 3,
        quantity: 48,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 1,
        product_id: 4,
        quantity: 37,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 1,
        product_id: 5,
        quantity: 45,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        warehouse_id: 2,
        product_id: 1,
        quantity: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 2,
        product_id: 2,
        quantity: 139,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 2,
        product_id: 3,
        quantity: 48,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 2,
        product_id: 4,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 2,
        product_id: 5,
        quantity: 35,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        warehouse_id: 3,
        product_id: 1,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 3,
        product_id: 2,
        quantity: 105,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 3,
        product_id: 3,
        quantity: 35,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 3,
        product_id: 4,
        quantity: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        warehouse_id: 3,
        product_id: 5,
        quantity: 35,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("warehouse_stock", null, {});
  },
};
