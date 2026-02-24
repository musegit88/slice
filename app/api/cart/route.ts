import { getUser } from "@/currentuser/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    menuId,
    name,
    image,
    basePrice,
    totalPrice,
    sizes,
    extras,
    quantity,
  } = body;
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json("User not found", { status: 400 });
  }
  try {
    const cart = await prisma.cart.create({
      data: {
        user: { connect: { id: userId } },
        menuId,
        name,
        image,
        basePrice,
        totalPrice,
        sizes,
        extras,
        quantity,
      },
    });
    return NextResponse.json(cart);
  } catch (error) {
    console.log("CART_POST_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json("User not found", { status: 400 });
  }
  try {
    const cart = await prisma.cart.findMany({
      where: {
        user: { id: userId },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(cart);
  } catch (error) {
    console.log("CART_GET_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { selectedItems } = body;
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json("User not found", { status: 400 });
  }
  try {
    const cart = await prisma.cart.deleteMany({
      where: {
        user: { id: userId },
        id: {
          in: selectedItems,
        },
      },
    });
    return NextResponse.json(cart);
  } catch (error) {
    console.log("CARTS_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
