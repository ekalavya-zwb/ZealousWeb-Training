"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("employees", {
      fields: ["dept_id"],
      type: "foreign key",
      name: "fk_dept_id",
      references: {
        table: "departments",
        field: "dept_id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("employees", "fk_dept_id");
  },
};
