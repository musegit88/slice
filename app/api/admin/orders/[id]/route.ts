import { getUser } from "@/currentuser/user";
import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getUser();

  // check if the user is admin
  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("ORDER_GET_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// change the status of the order

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getUser();
  const body = await req.json();
  const { status } = body;

  // check if the user is admin
  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const order = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status: status,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("ORDER_PATCH_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
