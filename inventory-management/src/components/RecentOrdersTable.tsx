"use client";

import highlightStatus from "../utils/highlightStatus";
import { Order } from "../types/Order";
import formatDate from "../utils/formatDate";

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
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
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 px-4 py-2 text-gray-600"
              >
                No recent orders to display.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}
