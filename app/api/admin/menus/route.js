import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name, description, price, link, id } = body;
  try {
    const isExisted = await prisma.menu.findFirst({
      where: {
        name,
      },
    });
    if (isExisted) {
      return new NextResponse("Menu already exist", { status: 400 });
    }
    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        image: link,
        categoryId: id,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("MENU_POST_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
