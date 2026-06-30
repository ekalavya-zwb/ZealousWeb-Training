"use client";

import highlightStatus from "../utils/highlightStatus";
import { Order } from "../types/Order";
import formatDate from "../utils/formatDate";
import { deleteOrder } from "../actions/orders";
import { FiSearch } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const handleOrderDelete = async (orderId: number) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
      } catch (error) {
        console.error("Error deleting order:", error);
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
              Order Date
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Order Status
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Total Amount
            </th>
            <th className="border border-gray-300 bg-white px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        {orders && orders.length > 0 ? (
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white">
                <td className="border border-gray-300 px-4 py-2">
                  {order.customerName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(order.orderDate.toISOString())}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className={highlightStatus(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${(order.totalPrice || 0).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOrderDelete(order.id)}
                      className="text-md flex cursor-pointer items-center gap-1 rounded-md border border-red-600 px-2 py-1 font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Delete <FiTrash className="inline-block" />
                    </button>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-md flex cursor-pointer items-center gap-1 rounded-md border border-green-600 px-2 py-1 font-medium text-green-600 transition-colors hover:bg-green-50"
                    >
                      View <FiSearch className="inline-block" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="border border-gray-300 px-4 py-2 text-gray-600"
              >
                No orders match the current filters. Try adjusting your search
                criteria.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}
