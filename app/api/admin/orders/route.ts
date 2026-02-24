import { getUser } from "@/currentuser/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUser();
  // check if the user is admin
  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.log("ORDER_GET_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
