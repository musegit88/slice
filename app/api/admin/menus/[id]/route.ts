import { MenuItemType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.menu.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("MENU_DELETE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const menu = await prisma.menu.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(menu as MenuItemType);
  } catch (error) {
    console.log("MENU_GET_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { name, description, price, image, categoryId, sizes, extras } = body;
  const newSizes = sizes.map((size: { name: string; extraPrice: number }) => ({
    name: size.name,
    extraPrice: size.extraPrice,
  }));
  const newExtras = extras.map(
    (size: { name: string; extraPrice: number }) => ({
      name: size.name,
      extraPrice: size.extraPrice,
    }),
  );
  try {
    const response = await prisma.menu.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        price,
        image,
        categoryId,
        sizes: newSizes,
        extras: newExtras,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log("MENU_UPDATE_ERROR", error);
    return new NextResponse("Internal Server error");
  }
}
