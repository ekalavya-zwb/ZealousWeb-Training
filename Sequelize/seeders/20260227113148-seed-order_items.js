"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_items", [
      {
        order_id: 1,
        product_id: 1,
        quantity: 1,
        price: 1499.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 2,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 2,
        product_id: 3,
        quantity: 1,
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 2,
        product_id: 4,
        quantity: 2,
        price: 329.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 3,
        product_id: 2,
        quantity: 1,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 3,
        product_id: 5,
        quantity: 1,
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 4,
        product_id: 1,
        quantity: 1,
        price: 1499.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 4,
        product_id: 3,
        quantity: 1,
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 4,
        product_id: 5,
        quantity: 2,
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 5,
        product_id: 2,
        quantity: 3,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 5,
        product_id: 4,
        quantity: 1,
        price: 329.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 6,
        product_id: 2,
        quantity: 2,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 6,
        product_id: 3,
        quantity: 2,
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 7,
        product_id: 2,
        quantity: 5,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 7,
        product_id: 3,
        quantity: 5,
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 8,
        product_id: 5,
        quantity: 5,
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 9,
        product_id: 5,
        quantity: 5,
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 10,
        product_id: 3,
        quantity: 3,
        price: 119.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 10,
        product_id: 4,
        quantity: 3,
        price: 329.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 11,
        product_id: 2,
        quantity: 10,
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        order_id: 12,
        product_id: 4,
        quantity: 10,
        price: 329.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 12,
        product_id: 5,
        quantity: 5,
        price: 89.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_items", null, {});
  },
};
