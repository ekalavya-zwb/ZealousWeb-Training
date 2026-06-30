import { getWarehouses } from "@/src/actions/warehouses";
import WarehousesTable from "@/src/components/WarehousesTable";

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Warehouses</h1>
      <WarehousesTable warehouses={warehouses} />
    </div>
  );
}
