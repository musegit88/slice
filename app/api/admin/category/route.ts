import { getUser } from "@/currentuser/user";
import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUser();
  const body = await req.json();
  const { category }: { category: string } = body;

  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

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

export async function GET() {
  const user = await getUser();
  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const categories = await prisma.category.findMany({
      include: {
        menu: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORY_GET_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
