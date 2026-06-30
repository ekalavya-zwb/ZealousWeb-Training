"use client";

import { Warehouse } from "../types/Warehouse";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function WarehousesTable({
  warehouses,
}: {
  warehouses: Warehouse[];
}) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Warehouse Name
          </th>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Location
          </th>
          <th className="border border-gray-300 bg-white px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {warehouses.map((warehouse) => (
          <tr key={warehouse.id} className="hover:bg-white">
            <td className="border border-gray-300 px-4 py-2">
              {warehouse.warehouseName}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {warehouse.location}
            </td>
            <td className="flex items-center justify-center border border-gray-300 px-4 py-2">
              <Link
                href={`/warehouses/${warehouse.id}`}
                className="text-md flex cursor-pointer items-center gap-1 rounded-md border border-green-600 px-2 py-1 font-medium text-green-600 transition-colors hover:bg-green-50"
              >
                View Stocks <FiSearch className="inline-block" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
