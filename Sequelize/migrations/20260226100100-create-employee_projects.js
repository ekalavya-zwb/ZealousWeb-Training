"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee_projects", {
      emp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "employees",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "projects",
          key: "project_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      hours_worked: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("employee_projects");
  },
};
