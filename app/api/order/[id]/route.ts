import { getUser } from "@/currentuser/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("User not found", { status: 404 });
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("GET_ORDER_ERRR");
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify order belongs to user
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if already deleted
    if (order.deletedByUserAt) {
      return NextResponse.json(
        { error: "Order already deleted" },
        { status: 400 },
      );
    }

    // Soft delete order
    const deletedOrder = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        deletedByUserAt: new Date(),
      },
    });
    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("DELETE_ORDER_ERROR", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
