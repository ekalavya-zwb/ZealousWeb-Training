"use server";

import { prisma } from "../lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        productName: true,
        price: true,
        sku: true,
        warehouseStocks: {
          select: {
            stock: true,
            warehouse: {
              select: {
                warehouseName: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return {
      products: products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again.");
  }
}

export async function getProductsByWarehouse(warehouseId: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        warehouseStocks: {
          some: {
            warehouseId: warehouseId,
          },
        },
      },
      select: {
        id: true,
        productName: true,
        price: true,
        sku: true,
        warehouseStocks: {
          where: {
            warehouseId: warehouseId,
          },
          select: {
            stock: true,
            warehouseId: true,
            warehouse: {
              select: {
                warehouseName: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return {
      products: products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again.");
  }
}

export async function getProductInfo(productId: number) {
  try {
    const productInfo = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        productName: true,
        price: true,
        sku: true,
      },
    });
    return {
      ...productInfo,
      price: Number(productInfo?.price),
    };
  } catch (error) {
    console.error("Error fetching product info:", error);
    throw new Error("Failed to fetch product info. Please try again.");
  }
}
