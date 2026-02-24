import { getUser } from "@/currentuser/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
        deletedByUserAt: null,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("GET_ORDER_ERROR", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { selectedOrders } = body;
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json("User not found", { status: 400 });
  }
  try {
    const order = await prisma.order.updateMany({
      where: {
        userId: userId,
        id: { in: selectedOrders },
      },
      data: {
        deletedByUserAt: new Date(),
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("ORDERS_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
