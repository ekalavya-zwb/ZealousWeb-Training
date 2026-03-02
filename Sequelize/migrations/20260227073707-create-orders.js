"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "warehouse_id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("PLACED", "COMPLETED", "CANCELLED"),
        allowNull: false,
        defaultValue: "PLACED",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
