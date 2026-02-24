import { prisma } from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const menu = await prisma.menu.findMany({
      where: {
        categoryId: params.id,
      },
    });
    return NextResponse.json(menu);
  } catch (error) {
    console.log("MENU_GET_BY_ID_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
