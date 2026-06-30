"use client";

import formatDate from "../utils/formatDate";
import { OrderInfo } from "../types/OrderInfo";
import { FiTrash } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { cancelOrder } from "../actions/orders";

export default function ViewOrder({ order }: { order: OrderInfo }) {
  const handleOrderCancel = async (orderId: number, productId: number) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelOrder(orderId, productId);
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  return (
    <>
      <table className="w-full table-auto border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Customer Name
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">Email</th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Product Name
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Quantity
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Base Price
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Order Date
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Warehouse Name
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Total Price
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {order && order.orderItems && order.orderItems.length > 0 ? (
            order.orderItems.map((item) => (
              <tr
                key={`${order.id} - ${item.productId}`}
                className="hover:bg-white"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {order.customerName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(order.orderDate.toISOString())}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.warehouseName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.totalPrice.toFixed(2)}
                </td>
                <td className="flex items-center justify-center border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleOrderCancel(order.id, item.productId)}
                    disabled={
                      order.status !== "PLACED" || item.status === "CANCELLED"
                    }
                    className={`text-md flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-medium transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent ${
                      item.status === "COMPLETED"
                        ? "border-green-600 text-green-600 hover:bg-green-50"
                        : item.status === "PLACED"
                          ? "border-red-600 text-red-600 hover:bg-red-50"
                          : "border-gray-600 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.status === "CANCELLED"
                      ? "Cancelled"
                      : item.status === "COMPLETED"
                        ? "Completed"
                        : "Cancel"}{" "}
                    {item.status === "PLACED" ? (
                      <FiTrash className="inline-block" />
                    ) : item.status === "COMPLETED" ? (
                      <FiCheck className="inline-block" />
                    ) : (
                      <FiX className="inline-block" />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                No order items found for this order.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
