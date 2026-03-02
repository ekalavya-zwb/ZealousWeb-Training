"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee_transfer_logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emp_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "employees",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      },
      old_dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      new_dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        onDelete: "CASCADE",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employee_transfer_logs");
  },
};
