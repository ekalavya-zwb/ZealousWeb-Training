"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      budget: {
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
    await queryInterface.dropTable("projects");
  },
};
