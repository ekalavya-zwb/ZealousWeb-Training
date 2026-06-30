import PlaceOrderForm from "@/src/components/PlaceOrderForm";
import { getWarehouses } from "@/src/actions/warehouses";

export default async function PlaceOrderPage() {
  const warehouses = await getWarehouses();

  return (
    <div className="bg-gray-100">
      <PlaceOrderForm warehouses={warehouses} />
    </div>
  );
}
