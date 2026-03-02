module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define(
    "Warehouse",
    {
      warehouseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      warehouseName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      tableName: "warehouses",
      timestamps: true,
      underscored: true,
    },
  );

  return Warehouse;
};
