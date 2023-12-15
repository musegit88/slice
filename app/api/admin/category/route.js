import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { category } = body;
  try {
    const isExisted = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });
    if (isExisted) {
      return new NextResponse("Category already exist", { status: 400 });
    }
    await prisma.category.create({
      data: {
        name: category,
      },
    });

    return NextResponse.json("True");
  } catch (error) {
    console.log("CATEGORY_POST_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
