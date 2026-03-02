"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hire_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      // status: {
      //   type: Sequelize.ENUM("ONPROJECT", "TERMINATED", "ACTIVE", "ONBOARDED"),
      //   allowNull: false,
      //   defaultValue: "ACTIVE",
      // },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
