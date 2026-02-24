import { columns } from "./components/columns";
import { DataTabel } from "./components/data-tabel";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <DataTabel columns={columns} data={orders} />
    </div>
  );
};

export default OrdersPage;
