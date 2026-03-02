"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", [
      {
        customer_name: "Alice Johnson",
        order_date: "2026-01-10",
        warehouse_id: 1,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Bob Smith",
        order_date: "2026-01-11",
        warehouse_id: 2,
        status: "COMPLETED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Charlie Brown",
        order_date: "2026-01-12",
        warehouse_id: 1,
        status: "CANCELLED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Diana Prince",
        order_date: "2026-01-13",
        warehouse_id: 3,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Ethan Hunt",
        order_date: "2026-01-14",
        warehouse_id: 2,
        status: "COMPLETED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Michael Thompson",
        order_date: "2026-02-23",
        warehouse_id: 2,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Sofia Martinez",
        order_date: "2026-02-23",
        warehouse_id: 3,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Liam Connor",
        order_date: "2026-02-23",
        warehouse_id: 1,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Isabella Rossi",
        order_date: "2026-02-23",
        warehouse_id: 2,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Noah Schneider",
        order_date: "2026-02-23",
        warehouse_id: 1,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Ava Dubois",
        order_date: "2026-02-23",
        warehouse_id: 3,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_name: "Kenji Nakamura",
        order_date: "2026-02-23",
        warehouse_id: 2,
        status: "PLACED",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
