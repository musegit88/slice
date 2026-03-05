import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id: itemId } = params;
  try {
    await prisma.cart.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json("Item deleted successfully", { status: 200 });
  } catch (error) {
    console.log("CART_DELETE_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id: itemId } = params;
  try {
    const body = await req.json();
    const { quantity } = body;

    const cartItem = await prisma.cart.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json("Item not found", { status: 404 });
    }

    // Calculate unit price based on previous total price and quantity
    // This ensures sizes and extras are included in the new total
    const unitPrice = cartItem.totalPrice / cartItem.quantity;
    const newTotalPrice = unitPrice * quantity;

    await prisma.cart.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: quantity,
        totalPrice: newTotalPrice,
      },
    });
    return NextResponse.json("Item updated successfully", { status: 200 });
  } catch (error) {
    console.log("CART_UPDATE_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
