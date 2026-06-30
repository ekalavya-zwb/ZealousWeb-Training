import { getDashboardStats } from "../actions/dashboard";
import { getRecentOrders } from "../actions/orders";
import RecentOrdersTable from "../components/RecentOrdersTable";

export default async function Dashboard() {
  const orders = await getRecentOrders();
  const { totalOrders, placedOrders, cancelledOrders, completedOrders } =
    await getDashboardStats();

  const KPIs = [
    { label: "Total Orders", value: totalOrders },
    { label: "Placed Orders", value: placedOrders },
    { label: "Cancelled Orders", value: cancelledOrders },
    { label: "Completed Orders", value: completedOrders },
  ];

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <div className="mb-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {KPIs.map((kpi, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-lg font-semibold">{kpi.label}</h3>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>
      <h1 className="mb-4 text-2xl font-bold">Recent Orders</h1>
      <RecentOrdersTable orders={orders} />
    </div>
  );
}
