"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employee_projects", [
      {
        emp_id: 1,
        project_id: 1,
        hours_worked: 320,
        role: "Lead Developer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 1,
        project_id: 3,
        hours_worked: 180,
        role: "Backend Developer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 2,
        project_id: 1,
        hours_worked: 280,
        role: "Frontend Developer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 2,
        project_id: 3,
        hours_worked: 240,
        role: "Database Designer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 3,
        project_id: 2,
        hours_worked: 300,
        role: "Campaign Manager",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 3,
        project_id: 5,
        hours_worked: 200,
        role: "Marketing Lead",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 4,
        project_id: 3,
        hours_worked: 150,
        role: "Sales Consultant",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 5,
        project_id: 1,
        hours_worked: 250,
        role: "Developer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 6,
        project_id: 2,
        hours_worked: 280,
        role: "Content Creator",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 6,
        project_id: 5,
        hours_worked: 220,
        role: "Social Media Manager",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 7,
        project_id: 3,
        hours_worked: 310,
        role: "Sales Lead",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        emp_id: 8,
        project_id: 4,
        hours_worked: 400,
        role: "Project Manager",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employee_projects", null, {});
  },
};
