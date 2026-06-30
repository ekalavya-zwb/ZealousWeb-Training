import ViewOrder from "@/src/components/ViewOrder";
import { OrderInfo } from "@/src/types/OrderInfo";
import { getOrderInfo } from "@/src/actions/orders";

export default async function ViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order: OrderInfo = await getOrderInfo(Number(id));

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Order #{id}</h1>
      <ViewOrder order={order} />
    </div>
  );
}
