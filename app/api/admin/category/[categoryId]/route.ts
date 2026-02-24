import { getUser } from "@/currentuser/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { categoryId: string } },
) {
  const user = await getUser();
  const body = await req.json();
  const { category }: { category: string } = body;

  // check if the user is admin
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
      return NextResponse.json("Category already exist", { status: 400 });
    }
    const response = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: category,
      },
    });
    return NextResponse.json(response.name);
  } catch (error) {
    console.log("CATEGORY_UPDATE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } },
) {
  const user = await getUser();

  // check if the user is admin
  if (!user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json("true");
  } catch (error) {
    console.log("CATEGORY_DELETE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
