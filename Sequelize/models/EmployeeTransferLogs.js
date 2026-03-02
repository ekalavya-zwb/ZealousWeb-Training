module.exports = (sequelize, DataTypes) => {
  const EmployeeTransferLogs = sequelize.define(
    "EmployeeTransferLogs",
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
      empId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      oldDeptId: {
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      newDeptId: {
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "employee_transfer_logs",
      timestamps: true,
      underscored: true,
    },
  );

  return EmployeeTransferLogs;
};
