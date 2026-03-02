"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employees", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@company.com",
        hire_date: "2022-01-15",
        salary: 120000,
        dept_id: 1,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@company.com",
        hire_date: "2021-03-20",
        salary: 82000,
        dept_id: 1,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Mike",
        last_name: "Johnson",
        email: "mike.j@company.com",
        hire_date: "2023-06-10",
        salary: 66550,
        dept_id: 2,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Sarah",
        last_name: "Williams",
        email: "sarah.w@company.com",
        hire_date: "2020-11-05",
        salary: 68000,
        dept_id: 3,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Tom",
        last_name: "Brown",
        email: "tom.brown@company.com",
        hire_date: "2022-08-12",
        salary: 72000,
        dept_id: 3,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Emily",
        last_name: "Davis",
        email: "emily.d@company.com",
        hire_date: "2023-02-28",
        salary: 67170,
        dept_id: 2,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "James",
        last_name: "Wilson",
        email: "james.w@company.com",
        hire_date: "2021-07-19",
        salary: 79000,
        dept_id: 3,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        first_name: "Lisa",
        last_name: "Anderson",
        email: "lisa.a@company.com",
        hire_date: "2022-04-02",
        salary: 63000,
        dept_id: 4,
        manager_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);

    await queryInterface.bulkUpdate(
      "employees",
      { manager_id: 2 },
      { id: { [Op.in]: [1, 5] } },
    );
    await queryInterface.bulkUpdate("employees", { manager_id: 3 }, { id: 6 });
    await queryInterface.bulkUpdate("employees", { manager_id: 4 }, { id: 7 });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
