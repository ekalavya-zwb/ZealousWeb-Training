import { WarehouseStock } from "../types/WarehouseStocks";

export default function ViewStocksTable({
  warehouseStocks,
}: {
  warehouseStocks: WarehouseStock[];
}) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 bg-white px-4 py-2">
            Product Name
          </th>
          <th className="border border-gray-300 bg-white px-4 py-2">SKU</th>
          <th className="border border-gray-300 bg-white px-4 py-2">Price</th>
          <th className="border border-gray-300 bg-white px-4 py-2">Stock</th>
        </tr>
      </thead>
      {warehouseStocks && warehouseStocks.length > 0 ? (
        <tbody>
          {warehouseStocks.map((stock) => (
            <tr key={stock.product.sku} className="hover:bg-white">
              <td className="border border-gray-300 px-4 py-2">
                {stock.product.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {stock.product.sku}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${stock.product.price.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {stock.stock.toString().padStart(2, "0")}
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={4}
              className="border border-gray-300 px-4 py-2 text-gray-600"
            >
              No stocks to display for this warehouse.
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
