"use server";

import { prisma } from "../lib/prisma";

export async function getWarehouses() {
  try {
    return await prisma.warehouse.findMany({
      select: {
        id: true,
        warehouseName: true,
        location: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    throw new Error("Failed to fetch warehouses. Please try again.");
  }
}

export async function getWarehouseStocks(warehouseId: number) {
  try {
    const warehouseStocks = await prisma.warehouseStock.findMany({
      where: {
        warehouseId: warehouseId,
      },
      select: {
        stock: true,
        warehouse: {
          select: {
            warehouseName: true,
          },
        },
        product: {
          select: {
            productName: true,
            sku: true,
            price: true,
          },
        },
      },
    });

    return warehouseStocks.map((item) => ({
      ...item,
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    }));
  } catch (error) {
    console.error("Error fetching warehouse stocks:", error);
    throw new Error("Failed to fetch warehouse stocks. Please try again.");
  }
}
