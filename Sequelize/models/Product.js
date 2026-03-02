module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    {
      tableName: "products",
      timestamps: true,
      underscored: true,
    },
  );

  return Product;
};
