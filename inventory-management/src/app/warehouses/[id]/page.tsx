import { getWarehouseStocks } from "@/src/actions/warehouses";
import ViewStocksTable from "@/src/components/ViewStocksTable";
export default async function ViewStocksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const warehouseStocks = await getWarehouseStocks(Number(id));

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">
        {warehouseStocks[0]?.warehouse?.warehouseName || "Warehouse"} Stocks
      </h1>
      <ViewStocksTable warehouseStocks={warehouseStocks} />
    </div>
  );
}
