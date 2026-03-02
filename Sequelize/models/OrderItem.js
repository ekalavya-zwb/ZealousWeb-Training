module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1,
        },
      },
    },
    {
      tableName: "order_items",
      timestamps: true,
      underscored: true,
    },
  );

  return OrderItem;
};
