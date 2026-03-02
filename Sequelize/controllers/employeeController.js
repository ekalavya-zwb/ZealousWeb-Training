const {
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
} = require("../services/employeeService");

async function getEmployees(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  try {
    const employees = await getAllEmployees(page, limit);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployee(req, res) {
  try {
    const employee = await getEmployeeByID(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesFirstNameAndEmail(req, res) {
  try {
    const employees = await selectByNameAndEmail();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithSalaryRule(req, res) {
  try {
    const employees = await selectBySalaryRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithHireDateRule(req, res) {
  try {
    const employees = await selectByHireDateRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTotalEmployeesCount(req, res) {
  try {
    const count = await countTotalEmployees();
    res.status(200).json({ TotalEmployees: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getHighSalEmployee(req, res) {
  try {
    const max = await highSalEmployee();
    res.status(200).json({ MaxSal: max });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAvgSalEmployee(req, res) {
  try {
    const avg = await avgSalEmployee();
    res.status(200).json({ AvgSal: avg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderedSalEmployee(req, res) {
  try {
    const employees = await selectBySalaryDesc();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesStartWithJ(req, res) {
  try {
    const employees = await selectByfirstNameRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRecentHiredEmployees(req, res) {
  try {
    const employees = await selectRecentHiredEmployee();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUpdatedEmployees(req, res) {
  try {
    const employees = await updateEmployeeSal();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUpdatedEmployeesByDept(req, res) {
  try {
    const employees = await updateEmployeeSalByDept();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getDeletedEmployees(req, res) {
  try {
    const employees = await deleteEmployee();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRestoredEmployees(req, res) {
  try {
    const employees = await restoreEmployee();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPermanentlyDeletedEmployees(req, res) {
  try {
    const employees = await permanentDeleteEmployee();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithComplexWhereConditions(req, res) {
  try {
    const employees = await selectEmployeesWithComplexWhereConditions();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithAnalyticsQueries(req, res) {
  try {
    const employees = await selectEmployeesWithAnalyticsQueries();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function practicingEagerLoadingQueries(req, res) {
  try {
    const employees = await eagerLoadingQueries();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function practicingLazyLoadingQueries(req, res) {
  try {
    const employee = await lazyLoadingQueries();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function performingTransactionPractice(req, res) {
  const { id } = req.body;
  const { deptId } = req.body;

  try {
    await transactionPractice(id, deptId);
    res.status(200).json({ message: "Transaction executed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getEmployees,
  getEmployee,
  getEmployeesFirstNameAndEmail,
  getEmployeesWithSalaryRule,
  getEmployeesWithHireDateRule,
  getTotalEmployeesCount,
  getHighSalEmployee,
  getAvgSalEmployee,
  getOrderedSalEmployee,
  getEmployeesStartWithJ,
  getRecentHiredEmployees,
  getUpdatedEmployees,
  getUpdatedEmployeesByDept,
  getDeletedEmployees,
  getRestoredEmployees,
  getPermanentlyDeletedEmployees,
  getEmployeesWithComplexWhereConditions,
  getEmployeesWithAnalyticsQueries,
  practicingEagerLoadingQueries,
  practicingLazyLoadingQueries,
  performingTransactionPractice,
};
