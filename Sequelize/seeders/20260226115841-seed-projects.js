"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("projects", [
      {
        project_name: "Website Redesign",
        start_date: "2023-01-10",
        end_date: "2023-06-30",
        budget: 150000,
        dept_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        project_name: "Marketing Campaign Q1",
        start_date: "2023-01-01",
        end_date: "2023-03-31",
        budget: 80000,
        dept_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        project_name: "Sales Tool Development",
        start_date: "2023-02-15",
        end_date: "2023-12-31",
        budget: 200000,
        dept_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        project_name: "HR Portal",
        start_date: "2023-03-01",
        end_date: "2023-09-30",
        budget: 95000,
        dept_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        project_name: "Product Launch",
        start_date: "2023-04-01",
        end_date: "2023-08-31",
        budget: 120000,
        dept_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
