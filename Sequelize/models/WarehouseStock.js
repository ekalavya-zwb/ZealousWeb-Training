module.exports = (sequelize, DataTypes) => {
  const WarehouseStock = sequelize.define(
    "WarehouseStock",
    {
      warehouseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    {
      tableName: "warehouse_stock",
      timestamps: true,
      underscored: true,
    },
  );

  return WarehouseStock;
};
