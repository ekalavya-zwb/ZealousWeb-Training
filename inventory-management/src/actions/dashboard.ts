"use server";

import { prisma } from "../lib/prisma";

export async function getDashboardStats() {
  try {
    return await prisma.$transaction(async (tx) => {
      const totalOrders = await tx.order.count();
      const placedOrders = await tx.order.count({
        where: {
          status: "PLACED",
        },
      });
      const completedOrders = await tx.order.count({
        where: {
          status: "COMPLETED",
        },
      });
      const cancelledOrders = await tx.order.count({
        where: {
          status: "CANCELLED",
        },
      });

      return {
        totalOrders,
        placedOrders,
        completedOrders,
        cancelledOrders,
      };
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard stats. Please try again.");
  }
}
