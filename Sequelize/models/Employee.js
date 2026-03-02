module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("email", value.trim().toLowerCase());
        },
      },
      hireDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1,
        },
      },
      deptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      // status: {
      //   type: DataTypes.ENUM("ONPROJECT", "TERMINATED", "ACTIVE", "ONBOARDED"),
      //   allowNull: false,
      //   defaultValue: "ACTIVE",
      // },
      managerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "employees",
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
      foreignKey: "deptId",
      as: "department",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    Employee.belongsToMany(models.Project, {
      through: models.EmployeeProject,
      foreignKey: "empId",
      otherKey: "projectId",
      as: "projects",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Employee.belongsTo(models.Employee, {
      foreignKey: "managerId",
      as: "manager",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Employee.hasMany(models.Employee, {
      foreignKey: "managerId",
      as: "subordinates",
    });
  };

  return Employee;
};
