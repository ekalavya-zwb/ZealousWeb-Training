import { getOrders } from "@/src/actions/orders";
import OrdersTable from "@/src/components/OrdersTable";
import OrdersFilters from "@/src/components/OrdersFilters";
import { OrderFilter } from "@/src/types/OrderFilter";
import { Status } from "@/generated/prisma/enums";
import Pagination from "@/src/components/Pagination";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  // Await the search parameters from the URL
  const params = await searchParams;

  // Build the filters object based on the search parameters
  const filters: OrderFilter = {
    customerName: params.customerName || undefined,
    email: params.email || undefined,
    status: params.status ? (params.status as Status) : undefined,
    orderDateFrom: params.orderDateFrom
      ? new Date(params.orderDateFrom)
      : undefined,
    orderDateTo: params.orderDateTo ? new Date(params.orderDateTo) : undefined,
    totalAmountMin: params.totalAmountMin
      ? Number(params.totalAmountMin)
      : undefined,
    totalAmountMax: params.totalAmountMax
      ? Number(params.totalAmountMax)
      : undefined,
  };

  const { totalPages, orders } = await getOrders({
    ...filters,
    page: Number(params.page) || 1,
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link
          href="/orders/place-order"
          className="text-md flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Place Order <FiShoppingBag className="inline-block" />
        </Link>
      </div>
      <OrdersFilters />
      <OrdersTable orders={orders} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
