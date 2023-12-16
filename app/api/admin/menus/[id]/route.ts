import { NextResponse } from "next/server"

export async function DELETE(req, { params }: { params: { id: string } }) {
    try {
        await prisma.menu.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json("True")
    } catch (error) {
        console.log("MENU_DELETE_ERROR", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}