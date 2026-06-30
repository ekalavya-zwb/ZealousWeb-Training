"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { OrderFilter } from "../types/OrderFilter";
import { Status } from "@/generated/prisma/enums";

type WhereClause = {
  customerName?: {
    contains: string;
  };
  email?: {
    contains: string;
  };
  status?: Status;
  orderDate?: {
    gte?: Date;
    lte?: Date;
  };
};

type orderDateFilter = {
  gte?: Date;
  lte?: Date;
};

export async function getOrders(filters: OrderFilter) {
  const pageSize = 10; // Number of orders per page
  const currentPage = filters.page ? Number(filters.page) : 1;

  const where: WhereClause = {};

  if (filters.customerName) {
    where.customerName = {
      contains: filters.customerName,
    };
  }

  if (filters.email) {
    where.email = {
      contains: filters.email,
    };
  }

  if (filters.status) {
    where.status = filters.status;
  }

  const orderDateFilter: orderDateFilter = {};

  if (filters.orderDateFrom) {
    orderDateFilter.gte = new Date(
      new Date(filters.orderDateFrom).setUTCHours(0, 0, 0, 0),
    );
  }

  if (filters.orderDateTo) {
    orderDateFilter.lte = new Date(
      new Date(filters.orderDateTo).setUTCHours(23, 59, 59, 999),
    );
  }

  if (Object.keys(orderDateFilter).length > 0) {
    where.orderDate = orderDateFilter;
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      select: {
        id: true,
        customerName: true,
        email: true,
        orderDate: true,
        status: true,
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
    });

    const normalizedOrders = orders.map((order) => {
      const normalizedItems = order.orderItems.map((item) => ({
        ...item,
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
      }));

      return {
        ...order,
        orderDate: new Date(order.orderDate),
        totalPrice: normalizedItems.reduce(
          (accumulator, item) =>
            accumulator + item.quantity * item.product.price,
          0,
        ),
        orderItems: normalizedItems,
      };
    });

    const filteredOrders = normalizedOrders.filter((order) => {
      if (
        filters.totalAmountMin !== undefined &&
        order.totalPrice < filters.totalAmountMin
      ) {
        return false;
      }

      if (
        filters.totalAmountMax !== undefined &&
        order.totalPrice > filters.totalAmountMax
      ) {
        return false;
      }

      return true;
    });

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

    const pagedOrders = filteredOrders.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    return {
      totalPages,
      orders: pagedOrders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders. Please try again.");
  }
}

export async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        customerName: true,
        email: true,
        orderDate: true,
        status: true,
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
      take: 5,
    });

    return orders.map((order) => {
      const normalizedItems = order.orderItems.map((item) => ({
        ...item,
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
      }));

      return {
        ...order,
        orderDate: new Date(order.orderDate),
        totalPrice: normalizedItems.reduce(
          (accumulator, item) =>
            accumulator + item.quantity * item.product.price,
          0,
        ),
        orderItems: normalizedItems,
      };
    });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw new Error("Failed to fetch recent orders. Please try again.");
  }
}

export async function getOrderInfo(orderId: number) {
  try {
    const orderInfo = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        customerName: true,
        email: true,
        orderDate: true,
        warehouseId: true,
        status: true,
        warehouse: {
          select: {
            warehouseName: true,
          },
        },
        orderItems: {
          select: {
            productId: true,
            quantity: true,
            status: true,
            product: {
              select: {
                productName: true,
                price: true,
                sku: true,
              },
            },
          },
          orderBy: {
            productId: "asc",
          },
        },
      },
    });

    if (!orderInfo) {
      throw new Error(`Order with id ${orderId} not found.`);
    }

    const totalProducts = orderInfo.orderItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0,
    );

    const totalPrice = orderInfo.orderItems.reduce(
      (accumulator, item) =>
        accumulator + item.quantity * Number(item.product.price),
      0,
    );

    const normalizedItems = orderInfo.orderItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    }));

    return {
      ...orderInfo,
      orderDate: new Date(orderInfo.orderDate),
      warehouseName: orderInfo.warehouse.warehouseName,
      totalProducts: totalProducts,
      totalPrice: totalPrice,
      orderItems: normalizedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: item.product.productName,
        price: item.product.price,
        sku: item.product.sku,
        totalPrice: item.quantity * item.product.price,
        status: item.status,
      })),
    };
  } catch (error) {
    console.error("Error fetching order info:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch order info. Please try again.",
    );
  }
}

export async function deleteOrder(orderId: number) {
  try {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order. Please try again.");
  }

  revalidatePath("/orders");
}

export async function cancelOrder(orderId: number, productId: number) {
  try {
    await prisma.$transaction(async (tx) => {
      // Get the order item quantity and order's warehouse ID
      const orderItem = await tx.orderItem.findUnique({
        where: {
          orderId_productId: {
            orderId,
            productId,
          },
        },
      });

      if (!orderItem) {
        throw new Error("Order item not found.");
      }

      // Get the order's warehouse ID
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
        },
        select: {
          warehouseId: true,
        },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      // Update status of the order item
      await tx.orderItem.update({
        where: {
          orderId_productId: {
            orderId,
            productId,
          },
        },
        data: {
          status: "CANCELLED",
        },
      });

      // Restore warehouse stock
      await tx.warehouseStock.update({
        where: {
          productId_warehouseId: {
            productId,
            warehouseId: order.warehouseId,
          },
        },
        data: {
          stock: {
            increment: orderItem.quantity,
          },
        },
      });

      // Check if remaining items exist
      const remainingItems = await tx.orderItem.count({
        where: {
          orderId,
          status: {
            not: "CANCELLED",
          },
        },
      });

      // If no items remain, mark order as cancelled
      if (remainingItems === 0) {
        await tx.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "CANCELLED",
          },
        });
      }
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to cancel this order. Please try again!",
    );
  }

  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);
}

export async function placeOrder({
  customerName,
  email,
  orderDate,
  warehouseId,
  items,
}: {
  customerName: string;
  email: string;
  orderDate: Date;
  warehouseId: number;
  items: { productId: number; quantity: number }[];
}): Promise<number> {
  try {
    const orderId = await prisma.$transaction(async (tx) => {
      // Validate stock availability for all items
      for (const item of items) {
        const stock = await tx.warehouseStock.findFirst({
          where: {
            warehouseId,
            productId: item.productId,
          },
        });

        if (!stock || stock.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for product ${item.productId}. Available: ${stock?.stock ?? 0}, Requested: ${item.quantity}`,
          );
        }
      }

      const existingOrder = await tx.order.findFirst({
        where: {
          customerName,
          email,
        },
      });

      if (existingOrder) {
        throw new Error(
          "An order with this customer name and email already exists.",
        );
      }

      // Create the order
      const order = await tx.order.create({
        data: {
          customerName,
          email,
          orderDate,
          warehouseId,
          status: "PLACED",
          orderItems: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });

      // Decrement warehouse stock
      for (const item of items) {
        await tx.warehouseStock.updateMany({
          where: {
            warehouseId,
            productId: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order.id;
    });

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return orderId;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to place this order. Please try again!",
    );
  }
}
