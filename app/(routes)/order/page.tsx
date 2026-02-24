import { getUser } from "@/currentuser/user";
import OrderItems from "@/components/order-items";
import { OrderType } from "@/types";
import { redirect } from "next/navigation";
import OrderProvider from "@/components/providers/order-providers";
import { Suspense } from "react";
import { prisma } from "@/libs/prismaDB";

// Parent component: renders Suspense boundary
const MyOrdersPage = async () => {
  return (
    <Suspense fallback={<OrderSkeleton />}>
      <OrderContent />
    </Suspense>
  );
};

// Child async component: does the data fetching (Suspense catches this)
const OrderContent = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect("/login");
  }
  const orders: OrderType[] = await prisma.order.findMany({
    where: {
      userId: currentUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <OrderProvider>
      <div>
        <OrderItems orders={orders} />
      </div>
    </OrderProvider>
  );
};

export default MyOrdersPage;

const OrderSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted max-w-lg h-48 p-4 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};
