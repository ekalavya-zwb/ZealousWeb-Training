"use client";

import { Product } from "../types/Product";

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Product Name
          </th>
          <th className="border border-gray-300 bg-white px-4 py-2">SKU</th>
          <th className="border border-gray-300 bg-white px-4 py-2">Price</th>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Total Stock
          </th>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Stock by Warehouse
          </th>
        </tr>
      </thead>
      {products && products.length > 0 ? (
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-white">
              <td className="border border-gray-300 px-4 py-2">
                {product.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.sku}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${product.price.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.warehouseStocks.reduce(
                  (total, stock) => total + stock.stock,
                  0,
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul>
                  {product.warehouseStocks.map((stock) => (
                    <li key={stock.warehouse.warehouseName}>
                      {stock.warehouse.warehouseName}:{" "}
                      {stock.stock.toString().padStart(2, "0")}
                    </li>
                  ))}
                </ul>
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
              No products to display.
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
