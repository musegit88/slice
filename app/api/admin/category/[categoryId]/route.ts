import { NextResponse } from "next/server";

export async function PATCH(req, { params }: { params: { categoryId: string } }) {
  // TODO change to js
  const body = await req.json();
  const { value } = body;
  try {
    const isExisted = await prisma.category.findFirst({
      where: {
        name: value
      }
    })
    if (isExisted) {
      return new NextResponse("Category already existed", { status: 400 })
    }
    await prisma.category.update({
      where: {
        id: params.categoryId
      },
      data: {
        name: value,
      },
    });
    return NextResponse.json("true");
  } catch (error) {
    console.log("CATEGORY_UPDATE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req, { params }: { params: { categoryId: string } }) {
  const body = await req.json()
  const { categoryId } = body
  try {
    await prisma.category.delete({
      where: {
        id: categoryId
      }
    })
    return NextResponse.json("true")
  } catch (error) {
    console.log("CATEGORY_DELETE_ERROR", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}