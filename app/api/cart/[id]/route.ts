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
    await prisma.cart.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: quantity,
      },
    });
    return NextResponse.json("Item updated successfully", { status: 200 });
  } catch (error) {
    console.log("CART_UPDATE_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
