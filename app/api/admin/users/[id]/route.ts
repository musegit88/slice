import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { checked } = body;
  try {
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        isAdmin: checked,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("USER_UPDATE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.user.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("USER_DELETE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
