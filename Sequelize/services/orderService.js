const {
  Order,
  OrderItem,
  Warehouse,
  WarehouseStock,
  Product,
  sequelize,
} = require("../models");
const { Op, fn, col, Sequelize, where } = require("sequelize");

async function createOrder(order) {
  await sequelize.transaction(async (t) => {
    const warehouse = await Warehouse.findOne({
      where: {
        warehouseId: order.warehouseId,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    const orderData = await Order.create(
      {
        customerName: order.customerName,
        orderDate: order.orderDate,
        warehouseId: order.warehouseId,
        status: order.status,
      },
      {
        transaction: t,
      },
    );

    for (const item of order.items) {
      const product = await Product.findOne({
        where: {
          productId: item.productId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const stock = await WarehouseStock.findOne({
        where: {
          warehouseId: order.warehouseId,
          productId: item.productId,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!stock || stock.quantity < item.quantity) {
        throw new Error("Insufficient stock");
      }

      await OrderItem.create(
        {
          orderId: orderData.orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        },
        {
          transaction: t,
        },
      );

      await WarehouseStock.decrement("quantity", {
        by: item.quantity,
        where: { warehouseId: order.warehouseId, productId: item.productId },
        transaction: t,
      });
    }
  });
}

async function cancelOrder(orderId, productId) {
  await sequelize.transaction(async (t) => {
    console.log("Cancelling:", { orderId, productId });

    const orderItem = await OrderItem.findOne({
      where: {
        orderId,
        productId,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!orderItem) {
      throw new Error("Order item does not exist");
    }

    const order = await Order.findOne({
      where: {
        orderId,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!order) {
      throw new Error("Order does not exist");
    }

    await Order.update(
      {
        status: "CANCELLED",
      },
      {
        where: { orderId },
        transaction: t,
      },
    );

    await WarehouseStock.increment("quantity", {
      by: orderItem.quantity,
      where: { warehouseId: order.warehouseId, productId },
      transaction: t,
    });
  });
}

module.exports = { createOrder, cancelOrder };
