"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h2 className="text-2xl">
        <Link href="/">Inventory Manager</Link>
      </h2>
      <div className="flex space-x-4">
        <Link href="/">Dashboard</Link>
        <Link href="/products">Products</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/warehouses">Warehouses</Link>
      </div>
    </div>
  );
}
