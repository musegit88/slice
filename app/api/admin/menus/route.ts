import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, price, categoryId, image, sizes, extras } = body;
  const newSizes = sizes.map((size: { name: string; extraPrice: string }) => ({
    name: size.name,
    extraPrice: parseInt(size.extraPrice),
  }));
  const newExtras = extras.map(
    (size: { name: string; extraPrice: string }) => ({
      name: size.name,
      extraPrice: parseInt(size.extraPrice),
    }),
  );
  const mainPrice = parseInt(price);
  try {
    const isExisted = await prisma.menu.findFirst({
      where: {
        name,
      },
    });
    if (isExisted) {
      return new NextResponse("Menu already exist", { status: 400 });
    }
    await prisma.menu.create({
      data: {
        name,
        description,
        price: mainPrice,
        image,
        categoryId,
        extras: newExtras,
        sizes: newSizes,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("MENU_POST_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
