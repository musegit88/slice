import { getUser } from "@/currentuser/user";
import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json("User not found", { status: 401 });
    }

    const cartItems = await req.json();

    if (!Array.isArray(cartItems)) {
      return NextResponse.json("Invalid data format", { status: 400 });
    }

    const itemsToCreate = cartItems.map((item) => ({
      userId,
      menuId: item.menuId,
      name: item.name,
      image: item.image,
      basePrice: item.basePrice,
      totalPrice: item.totalPrice,
      sizes: item.sizes,
      extras: item.extras,
      quantity: item.quantity,
    }));

    if (itemsToCreate.length > 0) {
      await prisma.cart.createMany({
        data: itemsToCreate,
      });
    }

    return NextResponse.json({ success: true, count: itemsToCreate.length });
  } catch (error) {
    console.log("CART_SYNC_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
