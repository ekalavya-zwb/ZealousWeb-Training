const {
  Employee,
  Department,
  Project,
  EmployeeTransferLogs,
  sequelize,
} = require("../models");
const { Op, fn, col, Sequelize, where } = require("sequelize");

async function createEmployees(employees) {
  await Employee.bulkCreate(employees, { validate: true });
}

async function assignManager() {
  const managerMapping = [
    { employeeId: 1, managerId: 2 },
    { employeeId: 3, managerId: 6 },
    { employeeId: 5, managerId: 4 },
    { employeeId: 7, managerId: 4 },
    { employeeId: 9, managerId: 2 },
  ];

  for (const item of managerMapping) {
    await Employee.update(
      { managerId: item.managerId },
      { where: { id: item.employeeId } },
    );
  }
}

async function createEmployee(employee) {
  await Employee.create(employee);
}

async function getAllEmployees(page, limit) {
  const offset = (page - 1) * limit;

  const { count, rows } = await Employee.findAndCountAll({
    limit,
    offset,
    order: [["id", "ASC"]],
  });

  const totalPages = Math.ceil(count / limit);

  return {
    data: rows,
    totalCount: count,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

async function getEmployeeByID(id) {
  return await Employee.findByPk(id);
}

async function selectByNameAndEmail() {
  return await Employee.findAll({
    attributes: ["firstName", "email"],
  });
}

async function selectBySalaryRule() {
  return await Employee.findAll({
    where: { salary: { [Op.gt]: 70000 } },
  });
}

async function selectByHireDateRule() {
  return await Employee.findAll({
    where: { hireDate: { [Op.gt]: "2023-01-01" } },
  });
}

async function countTotalEmployees() {
  return await Employee.count();
}

async function highSalEmployee() {
  return await Employee.max("salary");
}

async function avgSalEmployee() {
  return await Employee.avg("salary");
}

async function selectBySalaryDesc() {
  return await Employee.findAll({
    order: [["salary", "DESC"]],
  });
}

async function selectByfirstNameRule() {
  return await Employee.findAll({
    where: {
      firstName: { [Op.like]: "J%" },
    },
  });
}

async function selectRecentHiredEmployee() {
  return await Employee.findAll({
    order: [["hireDate", "DESC"]],
    limit: 3,
  });
}

async function updateEmployeeSal() {
  await Employee.update(
    {
      salary: Sequelize.literal("salary * 1.1"),
    },
    { where: {} },
  );

  return await Employee.findAll();
}

async function updateEmployeeSalByDept() {
  await Employee.update(
    {
      salary: Sequelize.literal("salary * 1.1"),
    },
    { where: { deptId: 2 } },
  );

  return await Employee.findAll();
}

async function deleteEmployee() {
  await Employee.destroy({ where: { id: 9 } });
  return await Employee.findAll();
}

async function restoreEmployee() {
  await Employee.restore({ where: { id: 9 } });
  return await Employee.findAll();
}

async function permanentDeleteEmployee() {
  await Employee.destroy({ where: { id: 9 }, force: true });
  return await Employee.findAll();
}

// async function selectEmployeesWithComplexWhereConditions() {
//   return Employee.findAll({
//     where: { salary: { [Op.between]: [60000, 80000] } },
//   });
// }

// async function selectEmployeesWithComplexWhereConditions() {
//   return Employee.findAll({
//     where: { deptId: { [Op.in]: [1, 2, 3] } },
//   });
// }

// async function selectEmployeesWithComplexWhereConditions() {
//   return Employee.findAll({
//     where: {
//       hireDate: {
//         [Op.gte]: new Date("2023-01-01"),
//         [Op.lt]: new Date("2024-01-01"),
//       },
//     },
//   });
// }

// async function selectEmployeesWithComplexWhereConditions() {
//   return Employee.findAll({
//     where: { email: { [Op.like]: "%@company.com" } },
//   });
// }

// async function selectEmployeesWithComplexWhereConditions() {
//   return Employee.findAll({
//     where: { salary: { [Op.gt]: 70000 }, status: { [Op.eq]: "TERMINATED" } },
//   });
// }

async function selectEmployeesWithComplexWhereConditions() {
  return Employee.findAll({
    where: { deptId: { [Op.in]: [1, 2] } },
  });
}

// async function selectEmployeesWithAnalyticsQueries() {
//   return Employee.findAll({
//     attributes: ["deptId", [fn("COUNT", col("id")), "totalEmployees"]],
//     group: ["deptId"],
//   });
// }

// async function selectEmployeesWithAnalyticsQueries() {
//   return Employee.findAll({
//     attributes: [
//       "deptId",
//       [fn("ROUND", fn("AVG", col("salary")), 2), "avgSal"],
//     ],
//     group: ["deptId"],
//   });
// }

// async function selectEmployeesWithAnalyticsQueries() {
//   return Employee.findAll({
//     attributes: ["deptId", [fn("SUM", col("salary")), "totalSal"]],
//     group: ["deptId"],
//   });
// }

// async function selectEmployeesWithAnalyticsQueries() {
//   const [rows] = await sequelize.query(
//     `SELECT MAX(ROUND(avgSal, 2)) as maxAvgSal FROM (SELECT dept_id, AVG(salary) as avgSal FROM employees GROUP BY dept_id) as deptAvgs`,
//   );
//   return rows;
// }

async function selectEmployeesWithAnalyticsQueries() {
  const [rows] = await sequelize.query(
    `SELECT * FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)`,
  );
  return rows;
}

// async function eagerLoadingQueries() {
//   return await Employee.findAll({
//     include: {
//       model: Department,
//       as: "department",
//       attributes: ["deptName"],
//     },
//   });
// }

// async function eagerLoadingQueries() {
//   return await Employee.findAll({
//     include: {
//       model: Project,
//       as: "projects",
//       attributes: ["projectName"],
//       through: {
//         attributes: ["role"],
//       },
//     },
//   });
// }

// async function eagerLoadingQueries() {
//   return await Employee.findAll({
//     include: {
//       model: Department,
//       as: "department",
//       attributes: ["deptName"],
//       where: { deptId: { [Op.eq]: 1 } },
//     },
//     where: { salary: { [Op.gt]: 70000 } },
//   });
// }

// async function eagerLoadingQueries() {
//   return await Employee.findAll({
//     attributes: ["id", "firstName", "lastName", "email"],
//     include: {
//       model: Employee,
//       as: "manager",
//       attributes: ["firstName", "lastName"],
//     },
//   });
// }

// async function eagerLoadingQueries() {
//   return await Employee.findAll({
//     attributes: ["id", "firstName", "lastName", "email", "salary"],
//     include: {
//       model: Employee,
//       as: "manager",
//       attributes: ["firstName", "lastName", "salary"],
//     },
//     where: { salary: { [Op.gt]: col("manager.salary") } },
//   });
// }

async function eagerLoadingQueries() {
  return await Employee.findAll({
    include: {
      model: Department,
      as: "department",
      attributes: ["deptName"],
    },
    include: {
      model: Project,
      as: "projects",
      attributes: ["projectName"],
      through: { attributes: ["role", "hoursWorked"] },
    },
  });
}

// async function lazyLoadingQueries(id) {
//   const employee = await Employee.findByPk(id);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   return await employee.getProjects({
//     attributes: ["projectId", "projectName"],
//     joinTableAttributes: ["role"],
//   });
// }

// async function lazyLoadingQueries() {
//   const employee = await Employee.findByPk(3);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   return await employee.addProject(4, {
//     through: {
//       role: "Marketing Manager",
//       hoursWorked: 50,
//     },
//   });
// }

// async function lazyLoadingQueries() {
//   const employee = await Employee.findByPk(1);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   return await employee.hasProject(3);
// }

// async function lazyLoadingQueries() {
//   const employee = await Employee.findByPk(1);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   return await employee.countProjects();
// }

// async function lazyLoadingQueries() {
//   const employee = await Employee.findByPk(2);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   return await employee.createProject(
//     {
//       projectName: "ERP Portal",
//       startDate: "2023-05-14",
//       endDate: "2023-11-30",
//       budget: 100000,
//       deptId: 1,
//     },
//     {
//       through: {
//         role: "Lead Developer",
//         hoursWorked: 200,
//       },
//     },
//   );
// }

async function lazyLoadingQueries() {
  const employee = await Employee.findByPk(2);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return await employee.removeProject(6);
}

async function transactionPractice(empId, newDeptId) {
  await sequelize.transaction(async (t) => {
    const employee = await Employee.findByPk(empId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    const oldDeptId = employee.deptId;

    await employee.update({ deptId: newDeptId }, { transaction: t });

    return await EmployeeTransferLogs.create(
      {
        empId: 9,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        oldDeptId,
        newDeptId,
      },
      { transaction: t },
    );
  });
}

module.exports = {
  createEmployees,
  createEmployee,
  assignManager,
  getAllEmployees,
  getEmployeeByID,
  selectByNameAndEmail,
  selectBySalaryRule,
  selectByHireDateRule,
  countTotalEmployees,
  highSalEmployee,
  avgSalEmployee,
  selectBySalaryDesc,
  selectByfirstNameRule,
  selectRecentHiredEmployee,
  updateEmployeeSal,
  updateEmployeeSalByDept,
  deleteEmployee,
  restoreEmployee,
  permanentDeleteEmployee,
  selectEmployeesWithComplexWhereConditions,
  selectEmployeesWithAnalyticsQueries,
  eagerLoadingQueries,
  lazyLoadingQueries,
  transactionPractice,
};
