module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "warehouse_id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("PLACED", "COMPLETED", "CANCELLED"),
        allowNull: false,
        defaultValue: "PLACED",
      },
    },
    {
      tableName: "orders",
      timestamps: true,
      underscored: true,
    },
  );

  return Order;
};
